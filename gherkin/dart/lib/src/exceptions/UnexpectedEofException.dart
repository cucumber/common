import 'package:gherkin/language.dart';

import 'TokenParserException.dart';

class UnexpectedEofException extends TokenParserException
{
  final String stateComment;

  final List<String> expectedTokenTypes;

  UnexpectedEofException(Token receivedToken, this.expectedTokenTypes, this.stateComment)
    : super(_getMessage(expectedTokenTypes), receivedToken);

  static String _getMessage(List<String> expectedTokenTypes)
    => 'unexpected end of file, expected: ${expectedTokenTypes.join(", ")}';

}