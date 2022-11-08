import 'package:gherkin/language.dart';

class ParserException implements Exception
{
  final String message;

  final Location location;

  ParserException(this.message, [this.location=Location.empty]);

  @override String toString() {
    if( location.isEmpty ) {
      return message;
    }
    return '(${location.line}:${location.column}): $message';
  }
}
