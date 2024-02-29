const typeColorMap = {
  'grass': {
    'color': 0xFF8BC34A,
    'textColor': 0xFF000000,
  },
  'poison': {
    'color': 0xFF9C27B0,
    'textColor': 0xFFFFFFFF,
  },
  'fire': {
    'color': 0xFFF44336,
    'textColor': 0xFFFFFFFF,
  },
  'flying': {
    'color': 0xFF2196F3,
    'textColor': 0xFFFFFFFF,
  },
  'water': {
    'color': 0xFF2196F3,
    'textColor': 0xFFFFFFFF,
  },
  'bug': {
    'color': 0xFF4CAF50,
    'textColor': 0xFFFFFFFF,
  },
  'normal': {
    'color': 0xFFA1887F,
    'textColor': 0xFFFFFFFF,
  },
  'electric': {
    'color': 0xFFFFC107,
    'textColor': 0xFF000000,
  },
  'ground': {
    'color': 0xFF795548,
    'textColor': 0xFFFFFFFF,
  },
  'fairy': {
    'color': 0xFFE91E63,
    'textColor': 0xFFFFFFFF,
  },
  'fighting': {
    'color': 0xFF4CAF50,
    'textColor': 0xFFFFFFFF,
  },
  'psychic': {
    'color': 0xFFE91E63,
    'textColor': 0xFFFFFFFF,
  },
  'rock': {
    'color': 0xFF795548,
    'textColor': 0xFFFFFFFF,
  },
  'steel': {
    'color': 0xFF607D8B,
    'textColor': 0xFFFFFFFF,
  },
  'ice': {
    'color': 0xFF00BCD4,
    'textColor': 0xFF000000,
  },
  'ghost': {
    'color': 0xFF673AB7,
    'textColor': 0xFFFFFFFF,
  },
  'dragon': {
    'color': 0xFF673AB7,
    'textColor': 0xFFFFFFFF,
  },
  'dark': {
    'color': 0xFF000000,
    'textColor': 0xFFFFFFFF,
  },
};


class PokemonType {
  final String name;
  final List<String> strengths;
  final List<String> weaknesses;
  final List<String> debilities;

  PokemonType({
    required this.name,
    required this.strengths,
    required this.weaknesses,
    required this.debilities,
  });
}

List<PokemonType> pokemonTypes = [
  PokemonType(
    name: "Normal",
    strengths: [],
    weaknesses: ["Fighting"],
    debilities: ["Ghost"],
  ),
  PokemonType(
    name: "Fire",
    strengths: ["Grass", "Ice", "Bug", "Steel"],
    weaknesses: ["Water", "Rock", "Fire", "Dragon"],
    debilities: [],
  ),
  PokemonType(
    name: "Water",
    strengths: ["Fire", "Ground", "Rock"],
    weaknesses: ["Electric", "Grass"],
    debilities: [],
  ),
  PokemonType(
    name: "Electric",
    strengths: ["Water", "Flying"],
    weaknesses: ["Ground", "Electric", "Dragon"],
    debilities: [],
  ),
  PokemonType(
    name: "Grass",
    strengths: ["Water", "Ground", "Rock"],
    weaknesses: ["Fire", "Ice", "Poison", "Flying", "Bug"],
    debilities: [],
  ),
  PokemonType(
    name: "Ice",
    strengths: ["Grass", "Ground", "Flying", "Dragon"],
    weaknesses: ["Fire", "Fighting", "Rock", "Steel"],
    debilities: [],
  ),
  PokemonType(
    name: "Fighting",
    strengths: ["Normal", "Ice", "Rock", "Dark", "Steel"],
    weaknesses: ["Flying", "Psychic", "Fairy"],
    debilities: ["Ghost"],
  ),
  PokemonType(
    name: "Poison",
    strengths: ["Grass", "Fairy"],
    weaknesses: ["Poison", "Ground", "Rock", "Ghost"],
    debilities: ["Steel"],
  ),
  PokemonType(
    name: "Ground",
    strengths: ["Fire", "Electric", "Poison", "Rock", "Steel"],
    weaknesses: ["Water", "Grass", "Ice"],
    debilities: ["Flying"],
  ),
  PokemonType(
    name: "Flying",
    strengths: ["Grass", "Fighting", "Bug"],
    weaknesses: ["Electric", "Rock", "Steel"],
    debilities: [],
  ),
  PokemonType(
    name: "Psychic",
    strengths: ["Fighting", "Poison"],
    weaknesses: ["Psychic", "Steel"],
    debilities: ["Dark"],
  ),
  PokemonType(
    name: "Bug",
    strengths: ["Grass", "Psychic", "Dark"],
    weaknesses: ["Fire", "Fighting", "Poison", "Flying", "Ghost", "Steel", "Fairy"],
    debilities: [],
  ),
  PokemonType(
    name: "Rock",
    strengths: ["Fire", "Ice", "Flying", "Bug"],
    weaknesses: ["Water", "Grass", "Fighting", "Ground", "Steel"],
    debilities: [],
  ),
  PokemonType(
    name: "Ghost",
    strengths: ["Psychic", "Ghost"],
    weaknesses: ["Dark"],
    debilities: ["Normal"],
  ),
  PokemonType(
    name: "Dragon",
    strengths: ["Dragon"],
    weaknesses: ["Ice", "Dragon", "Fairy"],
    debilities: [],
  ),
  PokemonType(
    name: "Dark",
    strengths: ["Psychic", "Ghost"],
    weaknesses: ["Fighting", "Dark", "Fairy"],
    debilities: [],
  ),
  PokemonType(
    name: "Steel",
    strengths: ["Ice", "Rock", "Fairy"],
    weaknesses: ["Fire", "Water", "Electric", "Steel"],
    debilities: [],
  ),
  PokemonType(
    name: "Fairy",
    strengths: ["Fighting", "Dragon", "Dark"],
    weaknesses: ["Poison", "Steel"],
    debilities: [],
  ),
].toList();

