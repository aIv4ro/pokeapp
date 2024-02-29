import 'package:flutter/material.dart';
import 'package:pokeapp/pokedex.dart';
import 'package:pokeapp/pokemon.dart';
import 'package:pokeapp/types_table.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pokeapp',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) {
          final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>?;
          final initialTypeSearch = args?['type'] as String?;
          return MyHomePage(title: 'Pokeapp', initialTypeSearch: initialTypeSearch);
        },
        '/pokemon': (context) {
          final url = ModalRoute.of(context)!.settings.arguments as String;
          return PokemonPage(url: url);
        },
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title, this.initialTypeSearch});

  final String title;
  final String? initialTypeSearch;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class PageInfo {
  final String description;
  StatefulWidget Function(String) widget;

  PageInfo({required this.description, required this.widget});

}

class _MyHomePageState extends State<MyHomePage> {
  static final pagesInfo = [
    PageInfo(
      description: 'Tipos',
      widget: (String searchText) {
        return TypesTablePage(searchText: searchText);
      },
    ), 
    PageInfo(
      description: 'Pokedex',
      widget: (String searchText) {
        return const PokedexPage();
      },
    ),
  ];
  final searchbarController = TextEditingController();
  int _pageIndex = 0;
  bool _searching = false;
  String _searchText = '';

  @override
  void initState() {
    super.initState();
    if (widget.initialTypeSearch != null) {
      _searching = true;
      _searchText = widget.initialTypeSearch!;
      searchbarController.value = TextEditingValue(text: widget.initialTypeSearch!);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: _searching 
          ? SearchBar(
            controller: searchbarController,
            onChanged: (value) => setState(() {
              _searchText = value;
            }),
            hintText: 'Search ${pagesInfo[_pageIndex].description}...',
            trailing: [
              IconButton(
                icon: const Icon(Icons.search_off),
                onPressed: () {
                  setState(() {
                    _searching = false;
                  });
                },
              ),
            ],
            constraints: const BoxConstraints(
              maxHeight: 40,
              minHeight: 40,
            ),
            shape: MaterialStateProperty.all(RoundedRectangleBorder( borderRadius: BorderRadius.circular(2) ))
          )
          : Text(
              '${widget.title} - ${pagesInfo[_pageIndex].description}'
            ),
        actions: _searching || _pageIndex == 1 ? null : [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              setState(() {
                _searching = !_searching;
              });
            },
          ),
        ],
      ),
      body: pagesInfo[_pageIndex].widget(_searchText),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _pageIndex,
        onTap: (value) {
          setState(() {
            _pageIndex = value;
            if (value == 1) {
              _searching = false;
            }
          });
        },
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.catching_pokemon_sharp),
            label: 'Tabla de tipos',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.catching_pokemon),
            label: 'Pokedex',
          ),
        ],
      ),
    );
  }
}
