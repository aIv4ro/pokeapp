import { Chip } from '@mui/material'
import { PokemonType, useTranslation } from '../i18n'
import { typeColor } from '../constants'

export function TypeChip ({ type }: { type: string }) {
  const { tType } = useTranslation()
  const { backgroundColor, color } = typeColor[type]

  return (
    <Chip
      label={
        tType(type as PokemonType)
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
