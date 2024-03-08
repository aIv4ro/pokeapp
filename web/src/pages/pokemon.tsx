import { useEffect, useState } from 'react'
import { useParams } from 'wouter'
import { mainApi } from '../api'
import { PokemonAvatar } from '../components/pokemon-avatar'
import { PokemonTypes } from '../components/pokemon-types'
import { EvolutionChain } from '../components/evolution-chain'

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

export type PokemonWithEvolution = Awaited<ReturnType<typeof getPokemonWithEvolution>>

interface PokemonState {
  loading: boolean
  error?: string | null
  pokemon?: PokemonWithEvolution
}

export default function Pokemon () {
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
          <PokemonTypes types={pokemon.types} />
          <h3 className='text-xl font-bold my-2'>
            Evoluciones
          </h3>
          <EvolutionChain chain={pokemon.chain} />
        </>
      )}
    </main>
  )
}
