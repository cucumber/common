import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';

import 'GherkinLineSpan.dart';
import 'IGherkinDialect.dart';
import 'IGherkinLine.dart';
import 'Location.dart';
import 'TokenType.dart';

class Token implements INullSafetyObject
{
  static Token get empty => _InvalidToken();

  IGherkinLine line = IGherkinLine.empty;

  Location location = Location.empty;

  TokenType matchedType = TokenType.None;

  String matchedKeyword = Strings.empty;

  String matchedText = Strings.empty;

  Iterable<GherkinLineSpan> matchedItems = const <GherkinLineSpan>[];

  int matchedIndent = 0;

  IGherkinDialect matchedGherkinDialect = IGherkinDialect.empty;

  bool get isEof => line.isEof;

  String get tokenValue => isEof ? 'EOF' : line.getLineText(-1);

  Token(this.line, this.location);

  void detach() {
    if (line.isNotEof) {
      line.detach();
    }
  }

  @override
  String toString() =>
      '${matchedType.name}: $matchedKeyword/$matchedText';

  @override
  bool get isEmpty => false;/*line.isEmpty
      && location.isEmpty
      && matchedKeyword.isEmpty
      && matchedText.isEmpty
      && matchedItems.isEmpty
      && matchedGherkinDialect.isEmpty;*/

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [Token] instance.
class _InvalidToken extends Token
{
  _InvalidToken() : super(IGherkinLine.empty, Location.empty) {
    matchedGherkinDialect = IGherkinDialect.empty;
    matchedType = TokenType.None;
    matchedKeyword = Strings.empty;
    matchedText = Strings.empty;
    matchedItems = const <GherkinLineSpan>[];
    matchedIndent = 0;
  }

  @override
  bool get isEmpty => true;
}
