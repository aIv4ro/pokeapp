import { useEffect, useState } from 'react'
import { Link, useParams } from 'wouter'
import { mainApi } from './api'
import { TypeChip } from './type-chip'

async function getPokemonWithEvolution (id: number) {
  return await mainApi.pokemon
    .getPokemonById(Number(id))
    .then(async res => {
      const specieName = res.species.name
      const specie = await mainApi.pokemon.getPokemonSpeciesByName(specieName)
      const chainId = specie.evolution_chain.url.split('/').slice(-2, -1)[0]
      const { chain } = await mainApi.evolution.getEvolutionChainById(Number(chainId))
      return {
        ...res,
        chain
      }
    })
}

type PokemonWithEvolution = Awaited<ReturnType<typeof getPokemonWithEvolution>>

interface PokemonState {
  loading: boolean
  error?: string | null
  pokemon?: PokemonWithEvolution
}

export function Pokemon () {
  const { id } = useParams<{ id: string }>()
  const [pokemonState, setPokemonState] = useState<PokemonState>({
    loading: true
  })

  useEffect(() => {
    getPokemonWithEvolution(Number(id))
      .then(pokemon => {
        setPokemonState({
          loading: false,
          pokemon
        })
      }).catch(err => {
        setPokemonState({
          loading: false,
          error: err.message
        })
      })
  }, [id])

  const { loading, error, pokemon } = pokemonState

  return (
    <main className='p-2 overflow-x-auto flex-1 flex flex-col items-center'>
      {loading && <p>Loading ...</p>}
      {error != null && <p>Error: {error}</p>}
      {pokemon != null && (
        <>
          <PokemonAvatar
            src={pokemon.sprites.other?.['official-artwork'].front_default ?? pokemon.sprites.front_default ?? ''}
            alt={pokemon.name}
          />
          <h1 className='text-2xl font-bold uppercase'>{pokemon.name}</h1>
          <h3 className='text-xl font-bold my-2'>Tipos</h3>
          <ul className='flex gap-1'>
            {pokemon.types.map(({ type }) => (
              <li key={type.name}>
                <TypeChip type={type.name} />
              </li>
            ))}
          </ul>
          <h3 className='text-xl font-bold my-2'>
            Evoluciones
          </h3>
          <EvolutionChain chain={pokemon.chain} />
        </>
      )}
    </main>
  )
}

function EvolutionChain ({
  chain
}: {
  chain: PokemonWithEvolution['chain']
}) {
  const { evolves_to, evolution_details, species } = chain
  const [details] = evolution_details
  const id = species.url.split('/').slice(-2, -1)[0]

  return (
    <ul className='flex gap-2'>
      <li>
        <Link href={`/pokedex/${id}`}>
          <div className='flex flex-col text-center'>
            <PokemonAvatar
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={species.name}
              size='small'
            />
            <h4 className='text-lg font-bold'>{species.name}</h4>
            {details != null && (
              <EvolutionDetails details={details} />
            )}
          </div>
        </Link>
      </li>
      {evolves_to.length > 0 && (
        <li>
          {
            evolves_to.map((evChain) => {
              return (
                <EvolutionChain key={evChain.species.name} chain={evChain} />
              )
            })
          }
        </li>
      )}
    </ul>
  )
}

function EvolutionDetails ({
  details
}: {
  details: PokemonWithEvolution['chain']['evolution_details'][0]
}) {
  const { min_level, min_happiness, min_beauty, min_affection, item, trigger } = details
  return (
    <>
      {min_level != null && <p>nivel {min_level}</p>}
      {min_happiness != null && <p>felicidad {min_happiness}</p>}
      {min_beauty != null && <p>belleza {min_beauty}</p>}
      {min_affection != null && <p>affección {min_affection}</p>}
      {item != null && <p>objeto {item.name}</p>}
      {trigger != null && <p>al {trigger.name}</p>}
    </>
  )
}
function PokemonAvatar ({
  src,
  alt,
  size = 'medium'
}: {
  src: string
  alt: string
  size?: 'small' | 'medium'
}) {
  const sizeClass = size === 'small' ? 'w-24' : 'w-48'

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} aspect-square bg-slate-300 rounded`}
    />
  )
}
