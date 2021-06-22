import 'package:gherkin/core.dart';
import 'package:gherkin/src/ast/GherkinDocument.dart';
import 'package:gherkin/src/messages/Source.dart';
import 'package:gherkin/src/pickles/Pickle.dart';

class Envelope implements INullSafetyObject
{
  static final empty = _InvalidEnvelope();

  GherkinDocument gherkinDocument = GherkinDocument.empty;

  Source source = Source.empty;

  Pickle pickle = Pickle.empty;

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

// Convenience implementation of an invalid [Envelope] instance.
class _InvalidEnvelope
    extends Envelope
{
  @override
  bool get isEmpty => true;
}
