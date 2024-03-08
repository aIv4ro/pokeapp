import { useEffect, useMemo, useState } from 'react'
import { mainApi } from '../api'
import { type NamedAPIResource } from 'pokenode-ts'
import { PokedexList } from '../components/pokdex-list'
import { TextField } from '@mui/material'

interface PokedexState {
  loading: boolean
  error?: string | null
  pokedex?: NamedAPIResource[]
}

export default function Pokedex () {
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

  return (
    <main className='p-2 flex-1 flex flex-col overflow-y-auto gap-2'>
      <h1 className='text-2xl font-bold'>Pokedex</h1>
      {pokedexState.loading && <p>Loading ...</p>}
      {pokedexState.error != null && <p>Error: {pokedexState.error}</p>}
      {filteredPokedex != null && (
        <>
          <TextField
            variant='filled'
            label='Buscar Pokemon'
            className='w-full'
            value={search}
            onChange={e => {
              const { value } = e.target
              setSearch(value)
            }}
          />
          <PokedexList pokedex={filteredPokedex} />
        </>
      )}
    </main>
  )
}
