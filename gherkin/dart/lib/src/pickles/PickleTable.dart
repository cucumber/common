import 'package:gherkin/core.dart';
import 'package:gherkin/src/pickles/PickleTableRow.dart';

class PickleTable
  implements INullSafetyObject
{
  static const PickleTable empty = _InvalidPickleTable();

  final Iterable<PickleTableRow> rows;

  const PickleTable(this.rows);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    final sb = StringBuffer();
    sb..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('rows')
      ..write('=')
      ..write(rows.isEmpty ? '<null>' : rows)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is PickleTable)
        && other.rows == rows
    ;
  }

  @override
  int get hashCode
    => rows.hashCode;
}

class _InvalidPickleTable extends PickleTable {
  const _InvalidPickleTable()
    : super(const <PickleTableRow>[]);

  @override
  bool get isEmpty => true;
}