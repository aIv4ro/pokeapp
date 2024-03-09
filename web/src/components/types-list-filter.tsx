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
  selectedTypes: Set<string>
  onChange: (newList: Set<string>) => void
}) {
  const { types: translationTypes }: { types: Record<string, string> } = useTranslation()

  return (
    <div>
      {multiplier}
      <Stack direction='row' useFlexGap spacing={0.5} flexWrap={'wrap'}>
        {types.map(type => {
          const selected = selectedTypes.has(type.name)
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
                  const copy = new Set(selectedTypes)
                  copy.delete(type.name)
                  onChange(copy)
                  return
                }
                onChange(new Set([...selectedTypes, type.name]))
              }}
            />
          )
        })}
      </Stack>
    </div>
  )
}
