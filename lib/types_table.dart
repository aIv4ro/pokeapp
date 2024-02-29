import 'package:flutter/material.dart';
import 'package:pokeapp/data.dart';

class TypesTablePage extends StatefulWidget {
  const TypesTablePage({super.key, required this.searchText});

  final String searchText;

  @override
  State<TypesTablePage> createState() => _TypesTablePageState();
}

class _TypesTablePageState extends State<TypesTablePage> {
  @override
  Widget build(BuildContext context) {
    final lowercaseText = widget.searchText.toLowerCase();

    return SingleChildScrollView(
      child: DataTable(
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
              return type.name.toLowerCase().contains(lowercaseText);
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
    );
  }
}
