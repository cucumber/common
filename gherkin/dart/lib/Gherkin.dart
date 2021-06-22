import 'package:gherkin/language.dart';
import 'package:gherkin/messages.dart';

class Gherkin
{
  final List<String> paths;
  final List<Envelope> envelopes;
  final bool includeSource;
  final bool includeAst;
  final bool includePickles;
  final IdGenerator idGenerator;

  Gherkin(this.paths, this.envelopes, this.includeSource, this.includeAst
      , this.includePickles, this.idGenerator);

  static Stream<Envelope> fromPaths(List<String> paths, bool includeSource
      , bool includeAst, bool includePickles, IdGenerator idGenerator)
  {
    return Gherkin(paths, <Envelope>[], includeSource, includeAst
        , includePickles, idGenerator).messages();
  }
}