export type PokemonType = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'
// type PokemonTypeTranslation = `types.${PokemonType}`

const es = {
  'types.normal': 'normal',
  'types.fire': 'fuego',
  'types.water': 'agua',
  'types.electric': 'eléctrico',
  'types.grass': 'planta',
  'types.ice': 'hielo',
  'types.fighting': 'lucha',
  'types.poison': 'veneno',
  'types.ground': 'tierra',
  'types.flying': 'volador',
  'types.psychic': 'psíquico',
  'types.bug': 'bicho',
  'types.rock': 'roca',
  'types.ghost': 'fantasma',
  'types.dragon': 'dragón',
  'types.dark': 'siniestro',
  'types.steel': 'acero',
  'types.fairy': 'hada'
} as const

export function useTranslation () {
  const dic = es

  function t (key: keyof typeof es) {
    return dic[key]
  }

  function tType (key: PokemonType) {
    return dic[`types.${key}`]
  }

  return {
    t, tType
  }
}
