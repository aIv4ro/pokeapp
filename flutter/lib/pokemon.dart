import 'package:flutter/material.dart';
import 'package:pokeapp/data.dart';
import 'package:pokeapp/i18n.dart';
import 'package:pokeapp/pokedex.dart';

class Pokemon {
  final int id;
  final String name;
  final String image;
  final List<String> types;
  final List<Evolution> evs;

  Pokemon({required this.id, required this.name, required this.image, required this.types, this.evs = const []});

  static fromJson (Map<String, dynamic> json, {List<Evolution> evs = const []}) {
    final id = json['id'] as int;
    final name = json['name'] as String;
    final image = json['sprites']['other']['official-artwork']['front_default'] as String;
    final types = (json['types'] as List<dynamic>).map((e) => e['type']['name'] as String).toList();
    return Pokemon(id: id, name: name, image: image, types: types, evs: evs);
  }
}

class Evolution {
  final String name;
  final String image;
  final int? level;

  Evolution({required this.name, required this.image, this.level});

  static fromJson ({
    required Map<String, dynamic> json,
    int? level
  }) {
    final name = json['name'] as String;
    final image = json['sprites']['other']['official-artwork']['front_default'] as String;
    return Evolution(name: name, image: image, level: level);
  }
}

class PokemonPage extends StatefulWidget {
  const PokemonPage({super.key, required this.url});

  final String url;

  @override
  State<PokemonPage> createState() => _PokemonPageState();
}

class _PokemonPageState extends State<PokemonPage> {
  late final Future<Pokemon> _pokemon;

  @override
  void initState() {
    super.initState();
    _pokemon = dio
      .get(widget.url)
      .then((value) async {
        final json = value.data as Map<String, dynamic>;
        final evs = await dio.get(
          json['species']['url'] as String
        ).then((value) {
          final json = value.data as Map<String, dynamic>;
          return dio.get(
            json['evolution_chain']['url']
          ).then((value) {
            final json = value.data as Map<String, dynamic>;
            final chain = json['chain'] as Map<String, dynamic>;
            final List evs = [];
            evs.add({
              'name': chain['species']['name'],
              'level': null
            });
            final firstEv = chain['evolves_to'] as List<dynamic>;
            if (firstEv.isNotEmpty) {
              evs.add({
                'name': firstEv[0]['species']['name'],
                'level': firstEv[0]['evolution_details'][0]['min_level']
              });
              final secondEv = firstEv[0]['evolves_to'] as List<dynamic>;
              if (secondEv.isNotEmpty) {
                evs.add({
                  'name': secondEv[0]['species']['name'],
                  'level': secondEv[0]['evolution_details'][0]['min_level']
                });
              }
            }
            return evs;
          });
        });
        final populatedEvs = await Future.wait<Evolution>(
          evs.map((e) {
            if (e['name'] == json['name']) {
              return Future.value(Evolution.fromJson(json: json, level: e['level'] as int?));
            }
            return dio.get(
              'https://pokeapi.co/api/v2/pokemon/${e['name']}'
            ).then((value) {
              return Evolution.fromJson(
                json: value.data as Map<String, dynamic>,
                level: e['level'] as int?
              );
            });
          })
        );
        return Pokemon.fromJson(json, evs: populatedEvs);
      });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Pokemon page'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: FutureBuilder(
            future: _pokemon, 
            builder:(context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              }
              if (snapshot.hasError) {
                return Text('Error: ${snapshot.error}');
              }
              final Pokemon pokemon = snapshot.data!;
              final String id = pokemon.id.toString().padLeft(4, '0');
              return Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.transparent, width: 2),
                          borderRadius: BorderRadius.circular(10),
                          color: Colors.grey[200],
                        ),
                        child: Image.network(
                          pokemon.image,
                          width: MediaQuery.of(context).size.width * .5,
                          height: MediaQuery.of(context).size.width * .5,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Text('N.º $id', textAlign: TextAlign.left,),
                      Text(pokemon.name.capitalize(), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                      InkWell(
                        onTap: () {
                          Navigator.pushNamed(context, '/', arguments: {
                            'types': pokemon.types.map((e) => e.toLowerCase()).toList(),
                          });
                        },
                        child: Wrap(
                          spacing: 10,
                          children: pokemon.types.map(
                            (type) {
                              final typeColors = typeColorMap[type]!;
                              return Container(
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(2),
                                  color: Color(typeColors['color']!),
                                ),
                                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                                child: Text(t(type), style: TextStyle(color: Color(typeColors['textColor']!)))
                              );
                            }
                          ).toList(),
                        ),
                      ),
                      // evolutions
                      if (pokemon.evs.isNotEmpty) ...[
                        const SizedBox(height: 20),
                        const Text('Evoluciones', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 10),
                        Wrap(
                          spacing: 10,
                          children: pokemon.evs.map(
                            (ev) {
                              return InkWell(
                                onTap: ev.name.toLowerCase() == pokemon.name.toLowerCase() ? null : () {
                                  Navigator.pushNamed(context, '/pokemon', arguments: 'https://pokeapi.co/api/v2/pokemon/${ev.name}');
                                },
                                child: Column(
                                  children: [
                                    Container(
                                      decoration: BoxDecoration(
                                        border: Border.all(color: Colors.transparent, width: 2),
                                        borderRadius: BorderRadius.circular(10),
                                        color: Colors.grey[200],
                                      ),
                                      child: Image.network(
                                        ev.image,
                                        width: MediaQuery.of(context).size.width * .2,
                                        height: MediaQuery.of(context).size.width * .2,
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                    Text(
                                      ev.name.capitalize(), 
                                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)
                                    ),
                                    if (ev.level != null) Text('Nivel ${ev.level}', style: const TextStyle(fontSize: 12)),
                                  ],
                                ),
                              );
                            }
                          ).toList(),
                        ),
                      ]
                    ],
                  )
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}


extension StringExtension on String {
    String capitalize() {
      return "${this[0].toUpperCase()}${substring(1).toLowerCase()}";
    }
}