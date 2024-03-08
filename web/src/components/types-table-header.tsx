import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button } from '@mui/material'

export function TypesTableHeader ({
  showFilters,
  toggleShowFilters
}: {
  showFilters: boolean
  toggleShowFilters: () => void
}) {
  return (
    <header className='flex items-center gap-5 mb-4 justify-between'>
      <h1 className='text-2xl font-bold'>Tipos</h1>
      <Button
        onClick={toggleShowFilters}
        startIcon={showFilters ? <VisibilityOff /> : <Visibility />}
        variant='contained'
      >
        {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
      </Button>
    </header>
  )
}
