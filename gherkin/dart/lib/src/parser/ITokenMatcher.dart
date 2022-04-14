import 'package:gherkin/language.dart';

abstract class ITokenMatcher
{
  bool match_EOF(Token token);
  bool match_Empty(Token token);
  bool match_Comment(Token token);
  bool match_TagLine(Token token);
  bool match_FeatureLine(Token token);
  bool match_RuleLine(Token token);
  bool match_BackgroundLine(Token token);
  bool match_ScenarioLine(Token token);
  bool match_ExamplesLine(Token token);
  bool match_StepLine(Token token);
  bool match_DocStringSeparator(Token token);
  bool match_TableRow(Token token);
  bool match_Language(Token token);
  bool match_Other(Token token);
  void reset();
}
