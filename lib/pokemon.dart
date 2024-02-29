import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:pokeapp/data.dart';
import 'package:pokeapp/pokedex.dart';

class Pokemon {
  final int id;
  final String name;
  final String image;
  final List<String> types;

  Pokemon({required this.id, required this.name, required this.image, required this.types});

  static fromJson (Map<String, dynamic> json) {
    final id = json['id'] as int;
    final name = json['name'] as String;
    final image = json['sprites']['other']['official-artwork']['front_default'] as String;
    final types = (json['types'] as List<dynamic>).map((e) => e['type']['name'] as String).toList();
    return Pokemon(id: id, name: name, image: image, types: types);
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
      .then((value) {
        final json = value.data as Map<String, dynamic>;
        
        return Pokemon.fromJson(json);
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
                return const CircularProgressIndicator();
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
                        ),
                      ),
                      Text('N.º $id', textAlign: TextAlign.left,),
                      Text(pokemon.name.capitalize(), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                      Wrap(
                        spacing: 10,
                        children: pokemon.types.map(
                          (type) {
                            final typeColors = typeColorMap[type]!;
                            return InkWell(
                              onTap: () {
                                Navigator.pushNamed(context, '/', arguments: {
                                  'type': type,
                                });
                              },
                              child: Container(
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(2),
                                  color: Color(typeColors['color']!),
                                ),
                                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                                child: Text(type.capitalize(), style: TextStyle(color: Color(typeColors['textColor']!)))
                              ),
                            );
                          }
                        ).toList(),
                      )
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