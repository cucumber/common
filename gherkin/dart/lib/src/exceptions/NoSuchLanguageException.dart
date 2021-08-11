import 'package:gherkin/language.dart';

import 'ParserException.dart';

class NoSuchLanguageException extends ParserException
{
  NoSuchLanguageException(String language, [Location location=Location.empty])
    : super('Language not supported: $language', location)
  {
    if (language.isEmpty) {
      throw ArgumentError.notNull('language');
    }
  }
}
