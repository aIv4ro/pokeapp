import { TextField } from '@mui/material'
import { type FiltersState } from '../hooks/use-types-table-filters'
import { type Type } from 'pokenode-ts'
import { TypeListFilter } from './types-list-filter'

export function TypesTableFilters ({
  types,
  filters,
  navigate
}: {
  types: Type[]
  filters: FiltersState
  navigate: (newFilters: FiltersState) => void
}) {
  return (
    (
      <div className='my-4'>
        <TextField
          variant='filled'
          label='Nombre del tipo'
          value={filters.search}
          className='w-full'
          onChange={e => {
            navigate({ ...filters, search: e.target.value })
          }}
        />

        <TypeListFilter
          multiplier='x2'
          types={types}
          selectedTypes={filters.doubleDamage}
          onChange={(newList) => {
            navigate({ ...filters, doubleDamage: newList })
          }}
        />

        <TypeListFilter
          multiplier='x1/2'
          types={types}
          selectedTypes={filters.halfDamage}
          onChange={(newList) => {
            navigate({ ...filters, halfDamage: newList })
          }}
        />

        <TypeListFilter
          multiplier='x0'
          types={types}
          selectedTypes={filters.noDamage}
          onChange={(newList) => {
            navigate({ ...filters, noDamage: newList })
          }}
        />
      </div>
    )
  )
}
