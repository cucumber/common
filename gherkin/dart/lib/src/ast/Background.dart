import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

import 'Step.dart';
import 'StepsContainer.dart';

class Background extends StepsContainer
{
  static const empty = _InvalidBackground();

  const Background(Location location, String keyword, String name
      , String description , List<Step> steps)
    : super(location, keyword, name, description, steps);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [Background] instance.
class _InvalidBackground
    extends Background
{
  const _InvalidBackground()
      : super(Location.empty, Strings.empty, Strings.empty, Strings.empty
        , const <Step>[] );

  @override
  bool get isEmpty => true;
}