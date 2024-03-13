import { useEffect, useMemo, useState } from 'react'
import { mainApi } from '../api'
import { type NamedAPIResource } from 'pokenode-ts'
import { useLocation, useSearch } from 'wouter'
import { useDebounceCallback } from './use-debounce-callback'

interface PokedexState {
  loading: boolean
  error?: string | null
  pokedex?: NamedAPIResource[]
}

export function usePokedex () {
  const query = useSearch()
  const [, setLocation] = useLocation()

  const [pokedexState, setPokedexState] = useState<PokedexState>({
    loading: true
  })

  useEffect(() => {
    mainApi.pokemon
      .listPokemons(0, 10000)
      .then(res => {
        const { results } = res
        setPokedexState({
          loading: false,
          pokedex: results
        })
      })
      .catch(err => {
        setPokedexState({
          loading: false,
          error: err.message
        })
      })
  }, [])

  const search = useMemo(() => {
    const searchParams = new URLSearchParams(query)
    return searchParams.get('search') ?? ''
  }, [query])

  const filteredPokedex = useMemo(() => {
    if (pokedexState.pokedex == null) {
      return null
    }
    const lowered = search.toLowerCase()
    return pokedexState.pokedex.filter(pokemon => {
      return pokemon.name.includes(lowered)
    })
  }, [pokedexState.pokedex, search])

  const onSearchChange = useDebounceCallback((value: string) => {
    setLocation(`/pokedex?search=${value}`)
  }, 300, [])

  return {
    filteredPokedex,
    pokedexState,
    search,
    onSearchChange
  }
}
