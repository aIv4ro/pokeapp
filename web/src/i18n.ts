export type PokemonType = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'
// type PokemonTypeTranslation = `types.${PokemonType}`
export type Trigger = 'level-up' | 'trade' | 'use-item' | 'shed' | 'spin' | 'tower-of-darkness' | 'tower-of-waters' | 'three-critical-hits' | 'take-damage' | 'other' | 'agile-style-move' | 'strong-style-move' | 'recoil-damage'

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
  'types.fairy': 'hada',
  'trigger.level-up': 'Subir de nivel',
  'trigger.trade': 'Intercambio',
  'trigger.use-item': 'Objeto',
  'trigger.shed': 'Espacio en equipo + pokeball',
  'trigger.spin': 'Confeti + girar',
  'trigger.tower-of-darkness': 'Torre de la oscuridad',
  'trigger.tower-of-waters': 'Torre de las aguas',
  'trigger.three-critical-hits': 'Tres golpes críticos',
  'trigger.take-damage': 'Recibir daño',
  'trigger.other': 'Otro',
  'trigger.agile-style-move': '+20 usos Asalto Barrera',
  'trigger.strong-style-move': '+20 usos Mil Púas Tóxicas',
  'trigger.recoil-damage': '+294 PS daño de retroceso'
} as const

export function useTranslation () {
  const dic = es

  function t (key: keyof typeof es) {
    return dic[key] ?? key
  }

  function tType (key: PokemonType) {
    return t(`types.${key}`)
  }

  function tTrigger (key: Trigger) {
    return t(`trigger.${key}`)
  }

  return {
    t, tType, tTrigger
  }
}
