import 'package:gherkin/src/pickles/PickleTableCell.dart';

class PickleTableRow
{
  final Iterable<PickleTableCell> cells;

  PickleTableRow(this.cells);

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    final sb = StringBuffer();
    sb..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('value')
      ..write('=')
      ..write(cells.isEmpty ? '<null>' : cells)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is PickleTableRow)
        && other.cells == cells
    ;
  }

  @override
  int get hashCode => cells.hashCode;
}