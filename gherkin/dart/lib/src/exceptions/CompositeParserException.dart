import 'ParserException.dart';

class CompositeParserException extends ParserException
{
  final List<ParserException> errors;

  CompositeParserException(this.errors)
    : super(_getMessage(errors));

  static String _getMessage(List<ParserException> errors) {
    var linedErrors = errors.map((e) => e.message).join('\n');
    return 'Parser errors:\n$linedErrors';
  }

}
