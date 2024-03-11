import { PokedexList } from '../components/pokdex-list'
import { TextField } from '@mui/material'
import { usePokedex } from '../hooks/use-pokedex'

export default function Pokedex () {
  const { filteredPokedex, pokedexState, search, setSearch } = usePokedex()

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
