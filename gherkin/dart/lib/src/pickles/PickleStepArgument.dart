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
}

class _InvalidPickleStepArgument extends PickleStepArgument
{
  const _InvalidPickleStepArgument()
      : super();

  @override
  bool get isEmpty => true;
}