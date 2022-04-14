import 'package:gherkin/language.dart';

import 'ParserException.dart';

class TokenParserException extends ParserException
{
  TokenParserException(String message, Token receivedToken)
    : super(message, _getLocation(receivedToken));

  static Location _getLocation(Token receivedToken) {
    return receivedToken.isEof || receivedToken.location.column > 1
      ? receivedToken.location
      : Location(receivedToken.location.line, receivedToken.line.indent + 1);
  }
}
