import { useMemo } from 'react'
import { useTranslation, PokemonType } from '../i18n'
import { useTypesTableFilters } from '../hooks/use-types-table-filters'
import { useTypes } from '../hooks/use-types'
import { TypesTableHeader } from '../components/types-table-header'
import { TypesTableFilters } from '../components/types-table-filters'
import { TypesTableChart } from '../components/types-table-chart'

export default function TypesTable () {
  const { tType } = useTranslation()
  const { filters, showFilters, toggleShowFilters, navigate } = useTypesTableFilters()
  const { loading, error, types } = useTypes()

  const filteredTypes = useMemo(() => {
    if (types == null) {
      return
    }
    const { search, doubleDamage, halfDamage, noDamage } = filters
    return types.filter(type => {
      const matchSearch = search == null || search === '' || tType(type.name as PokemonType).includes(search.toLocaleLowerCase())
      const matchDoubleDamage = doubleDamage.size === 0 || type.damage_relations.double_damage_to.some(type => doubleDamage.has(type.name))
      const matchHalfDamage = halfDamage.size === 0 || type.damage_relations.half_damage_to.some(type => halfDamage.has(type.name))
      const matchNoDamage = noDamage.size === 0 || type.damage_relations.no_damage_to.some(type => noDamage.has(type.name))

      return matchSearch &&
        matchDoubleDamage &&
        matchHalfDamage &&
        matchNoDamage
    })
  }, [types, filters])

  return (
    <>
      <main className='p-2 overflow-x-auto flex-1 flex-col'>
        {loading && <p>Loading ...</p>}
        {error != null && <p>Error: {error}</p>}
        {types != null && (
          <>
            <TypesTableHeader showFilters={showFilters} toggleShowFilters={toggleShowFilters} />
            {showFilters && <TypesTableFilters types={types} filters={filters} navigate={navigate} />}
            <TypesTableChart filteredTypes={filteredTypes} />
          </>
        )}
      </main>
    </>
  )
}
