import 'package:gherkin/ast.dart';
import 'package:gherkin/core.dart';

class RuleChild
    implements INullSafetyObject
{
  static const empty = _InvalidRuleChild();

  final Background background;

  final Scenario scenario;

  const RuleChild.fromBackground(this.background)
      : scenario = Scenario.empty;

  const RuleChild.fromScenario(this.scenario)
      : background = Background.empty;

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

class _InvalidRuleChild extends RuleChild
{
  const _InvalidRuleChild()
      : super.fromBackground(Background.empty);

  @override
  bool get isEmpty => true;
}
