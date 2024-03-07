import { Chip } from '@mui/material'
import { useTranslation } from './i18n'

export const typeColor: Record<string, { backgroundColor: string, color: string }> = {
  normal: { backgroundColor: '#A8A878', color: 'black' },
  fire: { backgroundColor: '#F08030', color: 'white' },
  water: { backgroundColor: '#6890F0', color: 'white' },
  electric: { backgroundColor: '#F8D030', color: 'black' },
  grass: { backgroundColor: '#78C850', color: 'black' },
  ice: { backgroundColor: '#98D8D8', color: 'black' },
  fighting: { backgroundColor: '#C03028', color: 'white' },
  poison: { backgroundColor: '#A040A0', color: 'white' },
  ground: { backgroundColor: '#E0C068', color: 'black' },
  flying: { backgroundColor: '#A890F0', color: 'black' },
  psychic: { backgroundColor: '#F85888', color: 'white' },
  bug: { backgroundColor: '#A8B820', color: 'black' },
  rock: { backgroundColor: '#B8A038', color: 'black' },
  ghost: { backgroundColor: '#705898', color: 'white' },
  dragon: { backgroundColor: '#7038F8', color: 'white' },
  dark: { backgroundColor: '#705848', color: 'white' },
  steel: { backgroundColor: '#B8B8D0', color: 'black' },
  fairy: { backgroundColor: '#EE99AC', color: 'black' }
}

export function TypeChip ({ type }: { type: string }) {
  const t = useTranslation()
  const { backgroundColor, color } = typeColor[type]
  const types = t().types as Record<string, string>

  return (
    <Chip
      label={
        types[type]
      }
      sx={{
        backgroundColor,
        color,
        borderRadius: 1
      }}
      className='capitalize'
    />
  )
}
