import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/pickles.dart';

class PickleStep
    implements INullSafetyObject
{
  static final empty = _InvalidPickleStep();

  final String id;

  final String text;

  final PickleStepArgument argument;

  final List<String> astNodeIds = <String>[];

  PickleStep(this.id, this.text, this.argument);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => true;

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    final sb = StringBuffer();
    sb..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('argument')
      ..write('=')
      ..write(argument.isEmpty ? '<null>' : argument)
      ..write(',')
      ..write('astNodeIds')
      ..write('=')
      ..write(astNodeIds.isEmpty ? '<null>' : astNodeIds)
      ..write(',')
      ..write('id')
      ..write('=')
      ..write(id.isEmpty ? '<null>' : id)
      ..write(',')
      ..write('text')
      ..write('=')
      ..write(text.isEmpty ? '<null>' : text)
      ..write(']');
    return sb.toString();
  }
  
  @override
  bool operator ==(other) {
    return (other is PickleStep)
        && other.id == id
        && other.text == text
        && other.argument == argument
        && other.astNodeIds == astNodeIds
    ;
  }

  @override
  int get hashCode =>
      id.hashCode
      ^ text.hashCode
      ^ argument.hashCode
      ^ astNodeIds.hashCode
  ;
}

class _InvalidPickleStep extends PickleStep {
  _InvalidPickleStep()
      : super(Strings.empty, Strings.empty, PickleStepArgument.empty);

  @override
  bool get isEmpty => true;
}