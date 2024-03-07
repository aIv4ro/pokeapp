import { AppBar, BottomNavigation, BottomNavigationAction, Typography } from '@mui/material'
import { Link, Redirect, Route, Switch } from 'wouter'
import { TypesTable } from './types-table'
import { Pokedex } from './pokedex'
import { Pokemon } from './pokemon'

function App () {
  return (
    <div className='max-w-2xl m-auto flex flex-col min-h-screen'>
      <AppBar
        position='sticky'
        color='primary'
        className='p-2'
        sx={{
          top: 0
        }}
      >
        <Typography variant='h6'>
          Pokeapp
        </Typography>
      </AppBar>

      <Switch>
        <Route
          path='/types-table'
          component={TypesTable}
        />
        <Route
          path='/pokedex'
          component={Pokedex}
        />
        <Route
          path='/pokedex/:id'
          component={Pokemon}
        />
        <Route
          component={() => <Redirect to='/pokedex' />}
        />
      </Switch>

      <BottomNavigation
        showLabels
        sx={{
          position: 'sticky',
          top: 'auto',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'primary.main'
        }}
      >
        <BottomNavigationAction
          sx={{ color: 'primary.contrastText' }}
          label={<p className='text-lg font-bold'>Pokedex</p>}
          href='/pokedex'
          LinkComponent={Link}
        />
        <BottomNavigationAction
          sx={{ color: 'primary.contrastText' }}
          className='text-4xl font-bold'
          label={<p className='text-lg font-bold'>Tabla de tipos</p>}
          href='/types-table'
          LinkComponent={Link}
        />
      </BottomNavigation>
    </div>
  )
}

export default App
