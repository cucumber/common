import 'package:gherkin/core.dart';
import 'package:gherkin/pickles.dart';
import 'package:gherkin/src/pickles/PickleTable.dart';

class PickleStepArgument
  implements INullSafetyObject
{
  static const empty = _InvalidPickleStepArgument();

  final PickleTable dataTable;

  final PickleDocString docString;

  const PickleStepArgument(
      {this.dataTable = PickleTable.empty
        , this.docString = PickleDocString.empty} );

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    var sb = StringBuffer();
    sb
      ..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('docString')
      ..write('=')
      ..write(docString.isEmpty ? '<null>' : docString)
      ..write(',')
      ..write('dataTable')
      ..write('=')
      ..write(dataTable.isEmpty ? '<null>' : dataTable)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is PickleStepArgument)
        && other.dataTable == dataTable
        && other.docString == docString
    ;
  }

  @override
  int get hashCode =>
      dataTable.hashCode
      ^ docString.hashCode;
}

class _InvalidPickleStepArgument extends PickleStepArgument
{
  const _InvalidPickleStepArgument()
      : super();

  @override
  bool get isEmpty => true;
}