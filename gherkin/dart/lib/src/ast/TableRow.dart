import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

import 'IHasLocation.dart';
import 'TableCell.dart';

class TableRow implements IHasLocation, INullSafetyObject
{
  static const empty = _InvalidTableRow();

  final String id;

  final Location _location;

  @override
  Location get location => _location;

  final Iterable<TableCell> cells;

  const TableRow(this._location, this.cells, {this.id=Strings.empty});

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;

}

/// Convenience implementation of an invalid [TableRow] instance.
class _InvalidTableRow extends TableRow
{
  const _InvalidTableRow() : super(Location.empty, const <TableCell>[]);

  @override
  bool get isEmpty => true;
}
