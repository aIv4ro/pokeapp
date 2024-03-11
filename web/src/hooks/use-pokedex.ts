import { useEffect, useMemo, useState } from "react"
import { mainApi } from "../api"
import { NamedAPIResource } from "pokenode-ts"

interface PokedexState {
  loading: boolean
  error?: string | null
  pokedex?: NamedAPIResource[]
}

export function usePokedex () {
  const [pokedexState, setPokedexState] = useState<PokedexState>({
    loading: true
  })
  const [search, setSearch] = useState('')

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

  const filteredPokedex = useMemo(() => {
    if (pokedexState.pokedex == null) {
      return null
    }
    const lowered = search.toLowerCase()
    return pokedexState.pokedex.filter(pokemon => {
      return pokemon.name.includes(lowered)
    })
  }, [pokedexState.pokedex, search])

  return {
    filteredPokedex,
    pokedexState,
    search,
    setSearch,
  }
}