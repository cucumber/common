import 'package:gherkin/core.dart';
import 'package:gherkin/language.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/parser.dart';

class AstNode implements INullSafetyObject
{
  static AstNode empty = _InvalidAstNode();

  final Map<RuleType, List<dynamic>> _subItems = <RuleType, List<dynamic>>{};

  final RuleType ruleType;

  AstNode(this.ruleType);

  Token getToken(TokenType tokenType)
    => singleOrDefault<Token>(tokenType.toRuleType(), Token.empty);

  Iterable<Token> getTokens(TokenType tokenType)
    => items<Token>(tokenType.toRuleType());

  void add<T>(RuleType ruleType, T obj) {
    var list = _subItems[ruleType];
    if(list == null) {
      _subItems[ruleType] = [obj];
    }
    else {
      list.add(obj);
    }
  }

  T singleOrDefault<T>(RuleType ruleType, T emptyValue) {
    var elems = items<T>(ruleType);
    if(elems.isEmpty) {
      return emptyValue;
    }
    return elems.first;
  }

  List<T> items<T>(RuleType ruleType) {
    var list = _subItems[ruleType];
    if(list == null) {
      return <T>[];
    }
    return list.cast<T>();
  }

  @override
  bool get isEmpty => false;//_subItems.isEmpty && ruleType == RuleType.None;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [AstNode] instance.
class _InvalidAstNode extends AstNode
{
  _InvalidAstNode() : super(RuleType.None);

  @override
  bool get isEmpty => true;
}