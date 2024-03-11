import { useCallback, useMemo, useState } from 'react'
import { useLocation, useSearch } from 'wouter'

export interface FiltersState {
  search?: string
  doubleDamage: Set<string>
  halfDamage: Set<string>
  noDamage: Set<string>
}

export function useTypesTableFilters () {
  const [, setLocation] = useLocation()
  const query = useSearch()
  const [showFilters, setShowFilters] = useState(false)

  const filters = useMemo<FiltersState>(() => {
    const params = new URLSearchParams(query)
    const x2 = new Set(params.getAll('x2')) ?? []
    const x1_2 = new Set(params.getAll('x1_2')) ?? []
    const x0 = new Set(params.getAll('x0')) ?? []
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
    doubleDamage.forEach(searchParams.append.bind(searchParams, 'x2'))
    halfDamage.forEach(searchParams.append.bind(searchParams, 'x1_2'))
    noDamage.forEach(searchParams.append.bind(searchParams, 'x0'))
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
