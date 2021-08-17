import 'package:gherkin/extensions.dart';

class GherkinLanguageKeywords
{
  static const GherkinLanguageKeywords empty = GherkinLanguageKeywords(
      Strings.empty, Strings.empty, [], [], [], [], [], [], [], [], [], [], []);

  final String name;
  final String native;
  final List<String> feature;
  final List<String> rule;
  final List<String> background;
  final List<String> scenario;
  final List<String> scenarioOutline;
  final List<String> examples;
  final List<String> given;
  final List<String> when;
  final List<String> then;
  final List<String> and;
  final List<String> but;

  const GherkinLanguageKeywords(
      this.name,
      this.native,
      this.feature,
      this.rule,
      this.background,
      this.scenario,
      this.scenarioOutline,
      this.examples,
      this.given,
      this.when,
      this.then,
      this.and,
      this.but);

  GherkinLanguageKeywords.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        native = json['native'],
        feature = json['feature'].cast<String>(),
        rule = json['rule'].cast<String>(),
        background = json['background'].cast<String>(),
        scenario = json['scenario'].cast<String>(),
        scenarioOutline = json['scenarioOutline'].cast<String>(),
        examples = json['examples'].cast<String>(),
        given = json['given'].cast<String>(),
        when = json['when'].cast<String>(),
        then = json['then'].cast<String>(),
        and = json['and'].cast<String>(),
        but = json['but'].cast<String>();
}

