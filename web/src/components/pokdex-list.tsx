import { Box, ListItemButton, ListItemText } from '@mui/material'
import { type NamedAPIResource } from 'pokenode-ts'
import { type ListChildComponentProps, FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Link } from 'wouter'

export function PokedexList ({
  pokedex
}: {
  pokedex: NamedAPIResource[]
}) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <FixedSizeList
            height={height - 97}
            width={width}
            itemSize={56}
            itemCount={pokedex.length}
            itemData={pokedex}
          >
            {PokedexListRow}
          </FixedSizeList>
        )
      }}
    </AutoSizer>
  )
}

export function PokedexListRow ({
  index, style, data
}: ListChildComponentProps<NamedAPIResource[]>) {
  const pokemon = data[index]
  const id = pokemon.url.split('/').slice(-2, -1)[0]

  return (
    <>
      <Box
        key={pokemon.name}
        style={style}
        className='px-2'
      >
        <ListItemButton
          component={Link}
          href={`/pokedex/${id}`}
          className='shadow'
        >
          <ListItemText className='capitalize' primary={`${id}. ${pokemon.name}`} />
        </ListItemButton>
      </Box>
      <Box sx={{ height: 8 }} />
    </>
  )
}
