import 'package:pokeapp/pokemon.dart';

const typesTranslations = {
  'grass': 'Planta',
  'poison': 'Veneno',
  'fire': 'Fuego',
  'flying': 'Volador',
  'water': 'Agua',
  'bug': 'Bicho',
  'normal': 'Normal',
  'electric': 'Eléctrico',
  'ground': 'Tierra',
  'fairy': 'Hada',
  'fighting': 'Lucha',
  'psychic': 'Psíquico',
  'rock': 'Roca',
  'steel': 'Acero',
  'ice': 'Hielo',
  'ghost': 'Fantasma',
  'dragon': 'Dragón',
  'dark': 'Siniestro'
};


String t (String type) {
  return typesTranslations[type.toLowerCase()] ?? type.capitalize();
}