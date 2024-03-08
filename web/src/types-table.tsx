import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { mainApi } from './api'
import { type Type } from 'pokenode-ts'
import { Button, Chip, Stack, TextField } from '@mui/material'
import { TypeChip, typeColor } from './type-chip'
import { useTranslation } from './i18n'
import { useLocation, useSearch } from 'wouter'

interface TypesState {
  loading: boolean
  types?: Type[]
  error?: string
}

interface FiltersState {
  search?: string
  doubleDamage: string[]
  halfDamage: string[]
  noDamage: string[]
}

export function TypesTable () {
  const t = useTranslation()
  const translationTypes = t().types as Record<string, string>

  const [, setLocation] = useLocation()
  const query = useSearch()

  const [typesState, setTypesState] = useState<TypesState>({
    loading: true
  })

  const [showFilters, setShowFilters] = useState(false)

  const filters = useMemo<FiltersState>(() => {
    const params = new URLSearchParams(query)
    const x2 = params.getAll('x2') ?? []
    const x1_2 = params.getAll('x1_2') ?? []
    const x0 = params.getAll('x0') ?? []
    const search = params.get('search') ?? ''
    return {
      search,
      doubleDamage: x2,
      halfDamage: x1_2,
      noDamage: x0
    }
  }, [query])

  console.log('types table render')

  const filteredTypes = useMemo(() => {
    const { types } = typesState
    if (types == null) {
      return
    }
    const { search, doubleDamage, halfDamage, noDamage } = filters
    return types.filter(type => {
      const matchSearch = search == null || search === '' || translationTypes[type.name].includes(search.toLocaleLowerCase())
      const matchDoubleDamage = doubleDamage.length === 0 || doubleDamage.some(name => type.damage_relations.double_damage_to.some(type => type.name.toLocaleLowerCase() === name))
      const matchHalfDamage = halfDamage.length === 0 || halfDamage.some(name => type.damage_relations.half_damage_to.some(type => type.name === name))
      const matchNoDamage = noDamage.length === 0 || noDamage.some(name => type.damage_relations.no_damage_to.some(type => type.name === name))
      return matchSearch && matchDoubleDamage && matchHalfDamage && matchNoDamage
    })
  }, [typesState, filters])

  useEffect(() => {
    mainApi
      .pokemon
      .listTypes(0, 18)
      .then(async res => {
        const { results } = res
        const promises = results.map(async type => {
          const { name } = type
          return await mainApi.pokemon.getTypeByName(name)
        })
        return await Promise.all(promises)
      })
      .then(types => {
        setTypesState({
          loading: false,
          types
        })
      })
      .catch(err => {
        setTypesState({
          loading: false,
          error: err.message
        })
      })
  }, [])

  function navigate (newFilters: FiltersState) {
    const searchParams = new URLSearchParams()
    const { search, doubleDamage, halfDamage, noDamage } = newFilters
    searchParams.set('search', search ?? '')
    doubleDamage.forEach(name => { searchParams.append('x2', name) })
    halfDamage.forEach(name => { searchParams.append('x1_2', name) })
    noDamage.forEach(name => { searchParams.append('x0', name) })
    setLocation(`/types-table?${searchParams.toString()}`)
  }

  const { loading, error, types } = typesState

  return (
    <>
      <main className='p-2 overflow-x-auto flex-1 flex-col'>
        {loading && <p>Loading ...</p>}
        {error != null && <p>Error: {error}</p>}
        {types != null && (
          <>
            <header className='flex items-center gap-5 mb-4 justify-between'>
              <h1 className='text-2xl font-bold'>Tipos</h1>
              <Button
                onClick={() => {
                  setShowFilters(!showFilters)
                }}
                startIcon={showFilters ? <VisibilityOff /> : <Visibility />}
                variant='contained'
              >
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              </Button>
            </header>

            {showFilters && (
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
            )}

            <table className='w-full'>
              <thead>
                <tr className=''>
                  <th className='text-left'>Tipo</th>
                  <th className='text-left'>x2</th>
                  <th className='text-left'>x1/2</th>
                  <th className='text-left'>x0</th>
                </tr>
              </thead>
              <tbody>
                {filteredTypes?.map(type => {
                  return (
                    <tr key={type.id}>
                      <td className='p-1'>
                        <TypeChip type={type.name} />
                      </td>
                      <td className='p-1'>
                        <Stack direction='row' spacing={0.5} useFlexGap flexWrap={'wrap'}>
                          {type.damage_relations.double_damage_to.map(type => <TypeChip key={type.name} type={type.name} />)}
                        </Stack>
                      </td>
                      <td className='p-1'>
                        <Stack direction='row' spacing={0.5} useFlexGap flexWrap={'wrap'}>
                          {type.damage_relations.half_damage_to.map(type => <TypeChip key={type.name} type={type.name} />)}
                        </Stack>
                      </td>
                      <td className='p-1'>
                        <Stack direction='row' spacing={0.5} useFlexGap flexWrap={'wrap'}>
                          {type.damage_relations.no_damage_to.map(type => <TypeChip key={type.name} type={type.name} />)}
                        </Stack>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </main>
    </>
  )
}

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
  const t = useTranslation()
  const translationTypes = t().types as Record<string, string>

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
