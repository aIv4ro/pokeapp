import { useCallback, useMemo, useState } from 'react'
import { useLocation, useSearch } from 'wouter'

export interface FiltersState {
  search?: string
  doubleDamage: string[]
  halfDamage: string[]
  noDamage: string[]
}

export function useTypesTableFilters () {
  const [, setLocation] = useLocation()
  const query = useSearch()
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

  const navigate = useCallback((newFilters: FiltersState) => {
    const searchParams = new URLSearchParams()
    const { search, doubleDamage, halfDamage, noDamage } = newFilters
    searchParams.set('search', search ?? '')
    doubleDamage.forEach(name => { searchParams.append('x2', name) })
    halfDamage.forEach(name => { searchParams.append('x1_2', name) })
    noDamage.forEach(name => { searchParams.append('x0', name) })
    setLocation(`/types-table?${searchParams.toString()}`)
  }, [setLocation])

  const toggleShowFilters = useCallback(() => {
    setShowFilters(prev => !prev)
  }, [showFilters, setShowFilters])

  return {
    filters,
    showFilters,
    toggleShowFilters,
    navigate
  }
}
