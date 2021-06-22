import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/pickles.dart';

class Pickle implements INullSafetyObject
{
  static const empty = _InvalidPickle();

  final String id;

  final String uri;

  final String name;

  final String language;

  final List<PickleStep> steps;

  final List<PickleTag> tags;

  final List<String> astNodeIds;

  const Pickle(this.id, this.uri, this.name, this.language
    ,this.steps, this.tags, this.astNodeIds);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [Pickle] instance.
class _InvalidPickle
    extends Pickle
{
  const _InvalidPickle()
      : super(Strings.empty, Strings.empty, Strings.empty, Strings.empty
    , const <PickleStep>[], const <PickleTag>[], const <String>[] );

  @override
  bool get isEmpty => true;
}
