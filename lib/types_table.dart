import 'package:flutter/material.dart';
import 'package:pokeapp/data.dart';
import 'package:pokeapp/pokemon.dart';

class TypesTablePage extends StatefulWidget {
  const TypesTablePage({super.key, required this.searchText, this.selectedTypes });

  final String searchText;
  final List<String>? selectedTypes;

  @override
  State<TypesTablePage> createState() => _TypesTablePageState();
}

class _TypesTablePageState extends State<TypesTablePage> {
  List<String> selectedTypes = [];

  @override
  void initState() {
    super.initState();
    selectedTypes = widget.selectedTypes ?? [];
  }

  @override
  Widget build(BuildContext context) {
    final lowercaseText = widget.searchText.toLowerCase();

    return SingleChildScrollView(
      child: Column(
        children: [
          if (selectedTypes.isNotEmpty)
            Wrap(
              spacing: 5,
              children: selectedTypes.map((type) {
                final typeColors = typeColorMap[type]!;
                return Padding(
                  padding: const EdgeInsets.all(0),
                  child: InputChip(
                    label: Text(type.capitalize()),
                    padding: EdgeInsets.zero,
                    labelStyle: TextStyle(color: Color(typeColors['textColor']!)),
                    backgroundColor: Color(typeColors['color']!),
                    onDeleted: () {
                      setState(() {
                        selectedTypes = selectedTypes.where((element) => element != type).toList();
                      });
                    },
                  ),
                );
              }).toList(),
            ),
          
          DataTable(
            columnSpacing: 20,
            dataRowMaxHeight: double.infinity,
            columns: const <DataColumn>[
              DataColumn(
                label: Text(
                  'Tipo',
                  style: TextStyle(fontStyle: FontStyle.italic),
                ),
              ),
              DataColumn(
                label: Text(
                  'Fortalezas',
                  style: TextStyle(fontStyle: FontStyle.italic),
                ),
              ),
              DataColumn(
                label: Text(
                  'Debilidades',
                  style: TextStyle(fontStyle: FontStyle.italic),
                ),
              ),
              DataColumn(
                label: Text(
                  'Inmunidades',
                  style: TextStyle(fontStyle: FontStyle.italic),
                ),
              ),
            ],
            rows: pokemonTypes.where((type) {
                  final typeLowered =  type.name.toLowerCase();
                  if (selectedTypes.isNotEmpty) {
                    return selectedTypes.contains(typeLowered) && typeLowered.contains(lowercaseText);
                  }
                  return typeLowered.contains(lowercaseText);
                }).map((type) {
                  return DataRow(
                    cells: [
                      DataCell(Text(type.name)),
                      DataCell(Text(type.strengths.join(', '))),
                      DataCell(Text(type.weaknesses.join(', '))),
                      DataCell(Text(type.debilities.join(', '))),
                    ],
                  );
                })
                .toList(),
          ),
        ],
      )
    );
  }
}
