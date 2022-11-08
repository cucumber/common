import 'package:gherkin/core.dart';
import 'package:gherkin/messages.dart';
import 'package:gherkin/src/ast/GherkinDocument.dart';
import 'package:gherkin/src/messages/types/Source.dart';
import 'package:gherkin/src/pickles/Pickle.dart';

class Envelope implements INullSafetyObject
{
  static final empty = _InvalidEnvelope();

  GherkinDocument gherkinDocument = GherkinDocument.empty;

  Source source = Source.empty;

  Pickle pickle = Pickle.empty;

  ParseError parseError = ParseError.empty;

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    final sb = StringBuffer();
    sb
      ..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
    //TODO..write('attachment')
    //TODO..write('=')
    //TODO..write(this.attachment == null ? "<null>" : this.attachment)
    //TODO..write(',')
      ..write('gherkinDocument')
      ..write('=')
      ..write(gherkinDocument.isEmpty ? '<null>' : gherkinDocument)
    /*TODO
      ..write(',')
      ..write("hook")
      ..write('=')
      ..write(this.hook == null ? "<null>" : this.hook)
      ..write(',')
      ..write("meta")
      ..write('=')
      ..write(this.meta == null ? "<null>" : this.meta)
      ..write(',')
      ..write("parameterType")
      ..write('=')
      ..write(this.parameterType == null ? "<null>" : this.parameterType)
      ..write(',')
      ..write("parseError")
      ..write('=')
      ..write(this.parseError == null ? "<null>" : this.parseError)*/
      ..write(',')
      ..write('pickle')
      ..write('=')
      ..write(pickle.isEmpty ? '<null>' : pickle)
      ..write(',')
      ..write('source')
      ..write('=')
      ..write(source.isEmpty ? '<null>' : source)
    /*TODO
      ..write(',')
      ..write("stepDefinition")
      ..write('=')
      ..write(this.stepDefinition == null ? "<null>" : this.stepDefinition)
      ..write(',')
      ..write("testCase")
      ..write('=')
      ..write(this.testCase == null ? "<null>" : this.testCase)
      ..write(',')
      ..write("testCaseFinished")
      ..write('=')
      ..write(this.testCaseFinished == null ? "<null>" : this.testCaseFinished)
      ..write(',')
      ..write("testCaseStarted")
      ..write('=')
      ..write(this.testCaseStarted == null ? "<null>" : this.testCaseStarted)
      ..write(',')
      ..write("testRunFinished")
      ..write('=')
      ..write(this.testRunFinished == null ? "<null>" : this.testRunFinished)
      ..write(',')
      ..write("testRunStarted")
      ..write('=')
      ..write(this.testRunStarted == null ? "<null>" : this.testRunStarted)
      ..write(',')
      ..write("testStepFinished")
      ..write('=')
      ..write(this.testStepFinished == null ? "<null>" : this.testStepFinished)
      ..write(',')
      ..write("testStepStarted")
      ..write('=')
      ..write(this.testStepStarted == null ? "<null>" : this.testStepStarted)
      ..write(',')
      ..write("undefinedParameterType")
      ..write('=')
      ..write(this.undefinedParameterType == null ? "<null>" : this.undefinedParameterType)
     */
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is Envelope)
        && other.gherkinDocument == gherkinDocument
        && other.pickle == pickle
        && other.source == source
      ;
  }

  @override
  int get hashCode
    => gherkinDocument.hashCode
    ^ pickle.hashCode
    ^ source.hashCode;
}

// Convenience implementation of an invalid [Envelope] instance.
class _InvalidEnvelope
    extends Envelope
{
  @override
  bool get isEmpty => true;
}
