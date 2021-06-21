import 'package:gherkin/language.dart';

class TestTokenFormatter
{
  String formatToken(Token token)
  {
    if (token.isEof) {
      return 'EOF';
    }
    var items = token.matchedItems.map((element) => '${element.column}:${element.text}');
    var matchedItems = items.isEmpty ? '' : items.join(',');
    var matchedType = token.matchedType.toString().split('.').last;
    var matchedKeyword = token.matchedKeyword.isEmpty ? '' : token.matchedKeyword;
    var matchedText = token.matchedText.isEmpty ? '' : token.matchedText;
    return '(${token.location.line}:${token.location.column})'
        '$matchedType:$matchedKeyword/$matchedText/$matchedItems';
  }
}