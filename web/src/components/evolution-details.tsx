import { type PokemonWithEvolution } from '../pages/pokemon'

export function EvolutionDetails ({
  details
}: {
  details: PokemonWithEvolution['chain']['evolution_details'][0]
}) {
  const { min_level, min_happiness, min_beauty, min_affection, item, trigger } = details
  return (
    <>
      {min_level != null && <p>nivel {min_level}</p>}
      {min_happiness != null && <p>felicidad {min_happiness}</p>}
      {min_beauty != null && <p>belleza {min_beauty}</p>}
      {min_affection != null && <p>affección {min_affection}</p>}
      {item != null && <p>objeto {item.name}</p>}
      {trigger != null && <p>al {trigger.name}</p>}
    </>
  )
}
