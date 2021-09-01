import 'package:gherkin/language.dart';
import 'package:gherkin/parser.dart';

extension TokenTypeExtension on TokenType
{
  String get name => toString().split('.').last;

  RuleType toRuleType() => RuleType.values[index];
}

