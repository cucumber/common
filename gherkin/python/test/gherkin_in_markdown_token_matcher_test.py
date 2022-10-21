# before_each(self):
from gherkin.token import Token
from gherkin.token_matcher import GherkinInMarkdownTokenMatcher
from gherkin.gherkin_line import GherkinLine
location = { 'line': 1, 'column': 1 }

def test_it_matches_FeatureLine():
  tm = GherkinInMarkdownTokenMatcher('en')
  line = GherkinLine('''## Feature: hello''',location['line'])
  token = Token(gherkin_line=line, location=location)
  assert tm.match_FeatureLine(token)
  assert token.matched_type == 'FeatureLine'
  assert token.matched_keyword == 'Feature'
  assert token.matched_text == 'hello'

def test_it_matches_FeatureLine_in_French():
  tm = GherkinInMarkdownTokenMatcher('fr')
  line = GherkinLine('''## Fonctionnalité: hello''',location['line'])
  token = Token(gherkin_line=line, location=location)
  assert tm.match_FeatureLine(token)
  assert token.matched_type == 'FeatureLine'
  assert token.matched_keyword == 'Fonctionnalité'
  assert token.matched_text == 'hello'

