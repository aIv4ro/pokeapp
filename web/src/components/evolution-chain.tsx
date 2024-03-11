import { Link, useParams } from 'wouter'
import { PokemonAvatar } from './pokemon-avatar'
import { EvolutionDetails } from './evolution-details'
import { type PokemonWithEvolution } from '../pages/pokemon'

export function EvolutionChain ({
  chain
}: {
  chain: PokemonWithEvolution['chain']
}) {
  const { id: urlId } = useParams<{ id: string }>()
  const { evolves_to, evolution_details, species } = chain
  const [details] = evolution_details
  const id = species.url.split('/').slice(-2, -1)[0]

  return (
    <ul className='flex gap-2'>
      <li className='max-w-28'>
        <Link
          href={`/pokedex/${id}`}
          className={`flex flex-col text-center transition-all hover:scale-105 rounded hover:bg-slate-100 p-2 ${urlId === id ? 'pointer-events-none' : ''}`}
        >
          <PokemonAvatar
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={species.name}
            size='small'
          />
          <h4 className='text-lg font-bold capitalize'>{species.name}</h4>
          {details != null && (
            <EvolutionDetails details={details} />
          )}
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
