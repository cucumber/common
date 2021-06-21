import 'package:gherkin/language.dart';

import 'IHasLocation.dart';
import 'IHasRows.dart';
import 'StepArgument.dart';
import 'TableRow.dart';

class DataTable extends StepArgument implements IHasRows, IHasLocation
{
  static const DataTable empty = _InvalidDataTable();

  final Iterable<TableRow> _rows;

  @override
  Location get location => rows.first.location;

  @override
  Iterable<TableRow> get rows => _rows;

  const DataTable._(this._rows);

  static DataTable newInstance(Iterable<TableRow> rows) {
    if (rows.isEmpty) {
      throw ArgumentError('rows: DataTable must have at least one row');
    }
    //_location = rows[0].location;
    //_rows = rows;
    return DataTable._(rows);
  }

  @override
  bool get isEmpty => false;//_location.isEmpty && _rows.isEmpty;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [DataTable] instance.
class _InvalidDataTable extends DataTable
{
  const _InvalidDataTable() : super._(
      const <TableRow>[
        TableRow.empty
      ]
  );

  @override
  bool get isEmpty => true;
}

