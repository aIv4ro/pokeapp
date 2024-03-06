import 'dart:async';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

final dio = Dio();

class Debouncer {
  final int milliseconds;
  Timer? _timer;
  Debouncer({required this.milliseconds});
  void run(VoidCallback action) {
    if (_timer != null) {
      _timer!.cancel();
    }
    _timer = Timer(Duration(milliseconds: milliseconds), action);
  }
}

class PokedexPage extends StatefulWidget {
  const PokedexPage({super.key});

  @override
  State<PokedexPage> createState() => _PokedexPageState();
}

class _PokedexPageState extends State<PokedexPage> {
  String _searchText = '';
  final _debouncer = Debouncer(milliseconds: 500);
  late final Future<dynamic> _pokedex;

  @override
  void initState() {
    super.initState();
    _pokedex = dio
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then((value) {
        final json = value.data as Map<String, dynamic>;
        return json['results'] as List<dynamic>;
      });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Column(
        children: [
          SearchBar(
            hintText: 'Buscar Pokemon',
            shape: MaterialStateProperty.all(RoundedRectangleBorder( borderRadius: BorderRadius.circular(2) )),
            onChanged: (value) {
              _debouncer.run(() {
                setState(() {
                  _searchText = value;
                });
              });
            },
          ),
          const SizedBox(height: 20),
          FutureBuilder(
            future: _pokedex,
            builder:(context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const CircularProgressIndicator();
              }
              if (snapshot.hasError) {
                return Text('Error: ${snapshot.error}');
              }
              final filteredItems = snapshot.data.where((item) {
                return item['name'].toString().toLowerCase().contains(_searchText.toLowerCase());
              }).toList();
              return Expanded(
                child: ListView.builder(
                  itemCount: filteredItems.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      onTap: () {
                        Navigator.pushNamed(context, '/pokemon', arguments: filteredItems[index]['url']);
                      },
                      title: Text(filteredItems[index]['name']),
                      subtitle: Text(filteredItems[index]['url']),
                    );
                  },
                ),
              );
            },
          )
        ],
      ),
    );
  }
}
