import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';

import 'GherkinLanguageKeywords.dart';

abstract class IGherkinDialect implements INullSafetyObject
{
  static const empty = _EmptyGherkinDialect();

  String get language;

  GherkinLanguageKeywords get keywords;

  List<String> get featureKeywords;

  String get name;

  String get nativeName;

  List<String> get ruleKeywords;

  List<String> get scenarioKeywords;

  List<String> get scenarioOutlineKeywords;

  List<String> get stepKeywords;

  List<String> get backgroundKeywords;

  List<String> get examplesKeywords;

  List<String> get givenStepKeywords;

  List<String> get whenStepKeywords;

  List<String> get thenStepKeywords;

  List<String> get andStepKeywords;

  List<String> get butStepKeywords;

}

/// Convenience implementation of an invalid [IGherkinDialect] instance.
class _EmptyGherkinDialect
    implements IGherkinDialect
{
  const _EmptyGherkinDialect();

  @override
  List<String> get andStepKeywords => [];

  @override
  List<String> get backgroundKeywords => [];

  @override
  List<String> get butStepKeywords => [];

  @override
  List<String> get examplesKeywords => [];

  @override
  List<String> get featureKeywords => [];

  @override
  List<String> get givenStepKeywords => [];

  @override
  GherkinLanguageKeywords get keywords => GherkinLanguageKeywords.empty;

  @override
  String get language => Strings.empty;

  @override
  String get name => Strings.empty;

  @override
  String get nativeName => Strings.empty;

  @override
  List<String> get ruleKeywords => [];

  @override
  List<String> get scenarioKeywords => [];

  @override
  List<String> get scenarioOutlineKeywords => [];

  @override
  List<String> get stepKeywords => [];

  @override
  List<String> get thenStepKeywords => [];

  @override
  List<String> get whenStepKeywords => [];

  @override
  bool get isEmpty => true;

  @override
  bool get isNotEmpty => false;
}