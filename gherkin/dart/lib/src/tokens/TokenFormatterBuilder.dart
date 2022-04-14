import 'package:gherkin/language.dart';
import 'package:gherkin/parser.dart';

import 'TestTokenFormatter.dart';
import 'object.dart';

class TokenFormatterBuilder implements IBuilder<object>
{
  final TestTokenFormatter formatter = TestTokenFormatter();
  final StringBuffer tokensTextBuilder = StringBuffer();

  String getTokensText()
  {
    return tokensTextBuilder.toString();
  }

  @override
  void build(Token token) {
    tokensTextBuilder.writeln(formatter.formatToken(token));
  }

  @override
  void endRule(RuleType ruleType) {
    // nop
  }

  @override
  void reset() {
    // nop
  }

  @override
  object get result => object();

  @override
  void startRule(RuleType ruleType) {
    // nop
  }
}