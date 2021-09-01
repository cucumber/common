import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';

class Location implements INullSafetyObject
{
  static const empty = _InvalidLocation();

  final int line;
  final int column;

  const Location({this.line=Int.min, this.column=Int.min});

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    final sb = StringBuffer();
    sb..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('line')
      ..write('=')
      ..write(line.isMin ? '<null>' : line)
      ..write(',')
      ..write('column')
      ..write('=')
      ..write(column.isMin ? '<null>' : column)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is Location)
        && other.line == line
        && other.column == column;
  }

  @override
  int get hashCode
    => line.hashCode ^ column.hashCode;

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [Location] instance.
class _InvalidLocation extends Location
{
  const _InvalidLocation()
      : super(line: Int.min, column: Int.min);

  @override
  bool get isEmpty => true;
}
