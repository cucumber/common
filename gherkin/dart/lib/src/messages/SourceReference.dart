import 'package:gherkin/core.dart';

class SourceReference implements INullSafetyObject
{
  static final empty = _InvalidSourceReference();

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [SourceReference] instance.
class _InvalidSourceReference extends SourceReference
{
  @override
  bool get isEmpty => true;
}
