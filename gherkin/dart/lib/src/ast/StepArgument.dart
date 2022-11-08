import 'package:gherkin/core.dart';

abstract class StepArgument implements INullSafetyObject
{
  static const empty = _InvalidStepArgument();

  const StepArgument();
}

/// Convenience implementation of an invalid [StepArgument] instance.
class _InvalidStepArgument
    extends StepArgument
{
  const _InvalidStepArgument();

  @override
  bool get isEmpty => true;

  @override
  bool get isNotEmpty => !isEmpty;
}
