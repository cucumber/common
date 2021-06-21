import 'package:gherkin/pickles.dart';

class PickleStep
{
  final String id;

  final String text;

  final List<String> astNodeIds = <String>[];

  PickleStepArgument argument = PickleStepArgument.empty;

  PickleStep(this.id, this.text);
}