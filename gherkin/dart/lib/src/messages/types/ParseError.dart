import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/messages.dart';

class ParseError implements INullSafetyObject
{
  static const empty = _InvalidParserError();

  final SourceReference source;
  final String message;

  const ParseError(this.source, this.message);

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    var sb = StringBuffer();
    sb
      ..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('source')
      ..write('=')
      ..write(source.isEmpty ? '<null>' : source)
      ..write(',')
      ..write('message')
      ..write('=')
      ..write(message.isEmpty ? '<null>' : message)
      ..write(']');
    return sb.toString();
  }

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;

  @override
  bool operator ==(other) {
    return (other is ParseError)
        && other.source == source
        && other.message == message;
  }

  @override
  int get hashCode
    => source.hashCode ^ message.hashCode;
}

class _InvalidParserError extends ParseError
{
  const _InvalidParserError()
      : super(SourceReference.empty, Strings.empty);

  @override
  bool get isEmpty => true;
}

