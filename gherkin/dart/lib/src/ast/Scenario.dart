import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

import 'Examples.dart';
import 'IHasTags.dart';
import 'Step.dart';
import 'StepsContainer.dart';
import 'Tag.dart';

class Scenario extends StepsContainer implements IHasTags, INullSafetyObject
{
  static const empty = _InvalidScenario();

  final Iterable<Tag> _tags;

  final String id;

  @override
  Iterable<Tag> get tags => _tags;

  final Iterable<Examples> examples;

  const Scenario(this._tags, Location location, String keyword, String name
      , String description, List<Step> steps, this.examples
      , {this.id=Strings.empty})
    : super(location, keyword, name, description, steps);

  @override
  bool get isEmpty => false;
}

/// Convenience implementation of an invalid [Scenario] instance.
class _InvalidScenario extends Scenario
{
  const _InvalidScenario()
    : super(const <Tag>[], Location.empty, Strings.empty
      , Strings.empty, Strings.empty, const <Step>[], const <Examples>[]);

  @override
  bool get isEmpty => true;
}
