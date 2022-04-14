import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

import 'IHasDescription.dart';
import 'IHasLocation.dart';
import 'IHasRows.dart';
import 'IHasTags.dart';
import 'TableRow.dart';
import 'Tag.dart';

class Examples implements IHasLocation, IHasDescription, IHasRows, IHasTags
    , INullSafetyObject
{
  static Examples empty = _InvalidExamples();

  final Iterable<Tag> _tags;
  final Location _location;
  final String _keyword;
  final String _name;
  final String _description;
  final TableRow _tableHeader;
  final Iterable<TableRow> _tableBody;
  late final List<TableRow> _rows;

  @override
  Iterable<Tag> get tags => _tags;
  @override
  Location get location => _location;
  @override
  String get keyword => _keyword;
  @override
  String get name => _name;
  @override
  String get description => _description;

  TableRow get tableHeader => _tableHeader;

  Iterable<TableRow> get tableBody => _tableBody;

  Examples(this._tags, this._location, this._keyword, this._name
      , this._description, this._tableHeader, this._tableBody)
  {
    _rows = <TableRow>[];
    if( _tableHeader.isNotEmpty ) {
      _rows.add(_tableHeader);
    }
    if( _tableBody.isNotEmpty ) {
      _rows.addAll(tableBody);
    }
  }

  @override
  Iterable<TableRow> get rows => _rows;

  @override
  bool get isEmpty => false;/*_tags.isEmpty
      && _location.isEmpty
      && _keyword.isEmpty
      && _name.isEmpty
      && _description.isEmpty
      && _tableHeader.isEmpty
      && _tableBody.isEmpty
      && _rows.isEmpty;*/

  @override
  bool get isNotEmpty => !isEmpty;
}


/// Convenience implementation of an invalid [Examples] instance.
class _InvalidExamples extends Examples
{
  _InvalidExamples() : super(const <Tag>[], Location.empty, Strings.empty
    , Strings.empty, Strings.empty, TableRow.empty, const <TableRow>[] );

  @override
  bool get isEmpty => true;
}
