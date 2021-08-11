import 'package:gherkin/language.dart';

import 'RuleType.dart';

abstract class IBuilder<T>
{
	void build(Token token);
	void startRule(RuleType ruleType);
	void endRule(RuleType ruleType);
	T get result;
	void reset();
}
