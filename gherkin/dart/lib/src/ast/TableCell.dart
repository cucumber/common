import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

import 'IHasLocation.dart';

class TableCell implements IHasLocation, INullSafetyObject
{
  static const empty = _InvalidTableCell();

  final Location  _location;

  final String value;

  @override
  Location get location => _location;

  const TableCell(this._location, this.value);

  @override
  bool get isEmpty => false;//_location.isEmpty && value.isEmpty;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [TableCell] instance.
class _InvalidTableCell extends TableCell
{
  const _InvalidTableCell() : super(Location.empty, Strings.empty) ;

  @override
  bool get isEmpty => true;
}

