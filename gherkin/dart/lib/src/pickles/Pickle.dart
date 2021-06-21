import 'package:gherkin/pickles.dart';

class Pickle
{
  final String id;

  final String uri;

  final String name;

  final String language;

  final List<PickleStep> steps;

  final List<PickleTag> tags;

  final List<String> astNodeIds;

  Pickle(this.id, this.uri, this.name, this.language
    ,this.steps, this.tags, this.astNodeIds);
}