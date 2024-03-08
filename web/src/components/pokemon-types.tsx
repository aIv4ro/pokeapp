import { Link } from 'wouter'
import { type PokemonWithEvolution } from '../pages/pokemon'
import { TypeChip } from './type-chip'

export function PokemonTypes ({ types }: { types: PokemonWithEvolution['types'] }) {
  const searchParams = new URLSearchParams()
  types.forEach(({ type }) => {
    searchParams.append('x2', type.name)
  })

  return (
    <Link
      href={`/types-table?${searchParams.toString()}`}
      className='p-2 hover:bg-slate-100 transition-colors rounded'
    >
      <ul className='flex gap-1'>
        {types.map(({ type }) => (
          <li key={type.name}>
            <TypeChip type={type.name} />
          </li>
        ))}
      </ul>
    </Link>
  )
}
