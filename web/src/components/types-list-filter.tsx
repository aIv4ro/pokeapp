import { Chip, Stack } from '@mui/material'
import { type Type } from 'pokenode-ts'
import { type ReactNode } from 'react'
import { useTranslation } from '../i18n'
import { typeColor } from './type-chip'

export function TypeListFilter ({
  multiplier,
  types,
  selectedTypes,
  onChange
}: {
  multiplier: ReactNode
  types: Type[]
  selectedTypes: string[]
  onChange: (newList: string[]) => void
}) {
  const { types: translationTypes }: { types: Record<string, string> } = useTranslation()

  return (
    <div>
      {multiplier}
      <Stack direction='row' useFlexGap spacing={0.5} flexWrap={'wrap'}>
        {types.map(type => {
          const selected = selectedTypes.includes(type.name)
          const colors = typeColor[type.name]

          return (
            <Chip
              key={type.id}
              label={translationTypes[type.name]}
              variant={selected ? 'filled' : 'outlined'}
              className='capitalize'
              sx={{
                backgroundColor: selected ? colors.backgroundColor : 'transparent',
                color: selected ? colors.color : 'canvastext',
                borderColor: colors.backgroundColor
              }}
              onClick={() => {
                if (selected) {
                  onChange(selectedTypes.filter(name => name !== type.name))
                  return
                }
                onChange(Array.from(new Set([...selectedTypes, type.name])))
              }}
            />
          )
        })}
      </Stack>
    </div>
  )
}
