import 'package:gherkin/language.dart';

import 'ParserException.dart';

class AstBuilderException extends ParserException
{
  AstBuilderException(String message, Location location)
      : super(message, location);
}
