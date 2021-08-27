import 'package:gherkin/language.dart';

import 'TokenParserException.dart';

class UnexpectedTokenException extends TokenParserException
{
  final String stateComment;

  final Token receivedToken;

  final List<String> expectedTokenTypes;

  UnexpectedTokenException(this.receivedToken, this.expectedTokenTypes, this.stateComment)
    : super(_getMessage(receivedToken, expectedTokenTypes), receivedToken);

  static String _getMessage(Token receivedToken, List<String> expectedTokenTypes)
    => 'expected: ${expectedTokenTypes.join(", ")}, got \'${receivedToken.tokenValue.trim()}\'';
}