import { type Type } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import { mainApi } from '../api'

interface TypesState {
  loading: boolean
  types?: Type[]
  error?: string
}

export function useTypes () {
  const [typesState, setTypesState] = useState<TypesState>({
    loading: true
  })

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

  return typesState
}
