import { Stack } from '@mui/material'
import { TypeChip } from './type-chip'
import { type Type } from 'pokenode-ts'

export function TypesTableChart ({
  filteredTypes
}: {
  filteredTypes?: Type[]
}) {
  return (
    <table className='w-full'>
      <thead>
        <tr className=''>
          <th className='text-left'>Tipo</th>
          <th className='text-left'>x2</th>
          <th className='text-left'>x1/2</th>
          <th className='text-left'>x0</th>
        </tr>
      </thead>
      <tbody>
        {filteredTypes?.map(type => {
          return (
            <tr key={type.id}>
              <td className='p-1'>
                <TypeChip type={type.name} />
              </td>
              <td className='p-1'>
                <Stack direction='row' spacing={0.5} useFlexGap flexWrap={'wrap'}>
                  {type.damage_relations.double_damage_to.map(type => <TypeChip key={type.name} type={type.name} />)}
                </Stack>
              </td>
              <td className='p-1'>
                <Stack direction='row' spacing={0.5} useFlexGap flexWrap={'wrap'}>
                  {type.damage_relations.half_damage_to.map(type => <TypeChip key={type.name} type={type.name} />)}
                </Stack>
              </td>
              <td className='p-1'>
                <Stack direction='row' spacing={0.5} useFlexGap flexWrap={'wrap'}>
                  {type.damage_relations.no_damage_to.map(type => <TypeChip key={type.name} type={type.name} />)}
                </Stack>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
