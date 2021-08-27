import 'package:gherkin/ast.dart';
import 'package:gherkin/core.dart';

class FeatureChild
    implements /*IHasLocation,*/ INullSafetyObject
{
  static const empty = _InvalidFeatureChild();

  final Background background;

  final Scenario scenario;

  final Rule rule;

  const FeatureChild.fromBackground(this.background)
    : scenario = Scenario.empty
    , rule = Rule.empty;

  const FeatureChild.fromScenario(this.scenario)
    : background = Background.empty
    , rule = Rule.empty;

  const FeatureChild.fromRule(this.rule)
    : background = Background.empty
    , scenario = Scenario.empty;

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}


/// Convenience implementation of an invalid [FeatureChild] instance.
class _InvalidFeatureChild
    extends FeatureChild
{
  const _InvalidFeatureChild()
      : super.fromBackground(Background.empty);

  @override
  bool get isEmpty => true;
}
