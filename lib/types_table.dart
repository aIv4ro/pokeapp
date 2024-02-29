import 'package:flutter/material.dart';
import 'package:pokeapp/data.dart';
import 'package:pokeapp/i18n.dart';

class TypesTablePage extends StatefulWidget {
  const TypesTablePage({super.key, required this.searchText, this.selectedTypes });

  final String searchText;
  final List<String>? selectedTypes;

  @override
  State<TypesTablePage> createState() => _TypesTablePageState();
}

class _TypesTablePageState extends State<TypesTablePage> {
  List<String> selectedStrengths = [];

  @override
  void initState() {
    super.initState();
    selectedStrengths = widget.selectedTypes ?? [];
  }

  @override
  Widget build(BuildContext context) {
    final lowercaseText = widget.searchText.toLowerCase();
    int chipIndex = 0;
    pokemonTypes.sort((a, b) {
      final aSelected = selectedStrengths.contains(a.name.toLowerCase());
      final bSelected = selectedStrengths.contains(b.name.toLowerCase());
      if (aSelected && !bSelected) {
        return -1;
      } else if (!aSelected && bSelected) {
        return 1;
      }
      return a.name.compareTo(b.name);
    });

    return SingleChildScrollView(
      child: Column(
        children: [
          const Text('Fortalezas', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: pokemonTypes.expand((type) {
                  chipIndex++;
                  final typeColors = typeColorMap[type.name.toLowerCase()]!;
                  final selected = selectedStrengths.contains(type.name.toLowerCase());

                  return [
                    if (chipIndex != 1) const SizedBox(width: 5),
                    InputChip(
                      label: Text(t(type.name)),
                      padding: EdgeInsets.zero,
                      labelStyle: TextStyle(color: Color(typeColors['textColor']!)),
                      backgroundColor: Color(typeColors['color']!),
                      onSelected: (bool selected) {
                        setState(() {
                          if (selected) {
                            selectedStrengths.add(type.name.toLowerCase());
                          } else {
                            selectedStrengths.remove(type.name.toLowerCase());
                          }
                        });
                      },
                      selected: selected,
                      avatar: selected ? null : const SizedBox(width: 20),
                    )
                  ];
                }).toList()
              ),
            ),
          ),
          DataTable(
            columnSpacing: 15,
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
                  final typeLowered = type.name.toLowerCase();
                  final translation = t(typeLowered).toLowerCase();
                  final strengthsCondition = selectedStrengths.isEmpty || 
                    type.strengths.any((e) => selectedStrengths.contains(e.toLowerCase()));
                  return strengthsCondition && translation.contains(lowercaseText);
                }).map((type) {
                  return DataRow(
                    cells: [
                      DataCell(Text(t(type.name))),
                      DataCell(Text(type.strengths.map((e) => t(e)).join(', '))),
                      DataCell(Text(type.weaknesses.map((e) => t(e)).join(', '))),
                      DataCell(Text(type.debilities.map((e) => t(e)).join(', '))),
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
