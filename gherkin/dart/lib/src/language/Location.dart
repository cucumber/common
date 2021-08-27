import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';

class Location implements INullSafetyObject
{
  final int line;
  final int column;

  static const empty = _InvalidLocation();

  const Location(this.line, this.column);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [Location] instance.
class _InvalidLocation extends Location
{
  const _InvalidLocation() : super(Int.min, Int.min);

  @override
  bool get isEmpty => true;
}
