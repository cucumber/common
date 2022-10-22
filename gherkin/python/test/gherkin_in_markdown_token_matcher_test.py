# before_each(self):
import pytest
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

def test_it_matches_bullet_Step():
  tm = GherkinInMarkdownTokenMatcher('en')
  line = GherkinLine('''  *  Given I have 3 cukes''',location['line'])
  token = Token(gherkin_line=line, location=location)
  assert tm.match_StepLine(token)
  assert token.matched_type == 'StepLine'
  assert token.matched_keyword == 'Given '
  assert token.matched_text == 'I have 3 cukes'
  assert token.location['column'] == 6

def test_it_matches_plus_Step():
  tm = GherkinInMarkdownTokenMatcher('en')
  line = GherkinLine('''  +  Given I have 3 cukes''',location['line'])
  token = Token(gherkin_line=line, location=location)
  assert tm.match_StepLine(token)
  assert token.matched_type == 'StepLine'
  assert token.matched_keyword == 'Given '
  assert token.matched_text == 'I have 3 cukes'
  assert token.location['column'] == 6

def test_it_matches_hyphen_Step():
  tm = GherkinInMarkdownTokenMatcher('en')
  line = GherkinLine('''  -  Given I have 3 cukes''',location['line'])
  token = Token(gherkin_line=line, location=location)
  assert tm.match_StepLine(token)
  assert token.matched_type == 'StepLine'
  assert token.matched_keyword == 'Given '
  assert token.matched_text == 'I have 3 cukes'
  assert token.location['column'] == 6

def test_it_matches_arbitrary_text_as_Other():
  tm = GherkinInMarkdownTokenMatcher('en')
  line = GherkinLine('''Whatever''',location['line'])
  token = Token(gherkin_line=line, location=location)
  assert tm.match_Other(token)
  assert token.matched_type == 'Other'

def test_it_matches_a_non_keyword_line_as_Other():
  tm = GherkinInMarkdownTokenMatcher('en')
  line = GherkinLine('''* whatever Given''',location['line'])
  token = Token(gherkin_line=line, location=location)
  assert tm.match_Other(token)
  assert token.matched_type == 'Other'

def test_it_matches_a_non_keyword_header_line_as_Other():
  tm = GherkinInMarkdownTokenMatcher('en')
  line = GherkinLine('''## The world is wet''',location['line'])
  token = Token(gherkin_line=line, location=location)
  assert tm.match_Other(token)
  assert token.matched_type == 'Other'

def test_it_matches_3_ticks_doctring_separator():
  tm = GherkinInMarkdownTokenMatcher('en')
  line = GherkinLine('''  ```somefink''',location['line'])
  token = Token(gherkin_line=line, location=location)
  assert tm.match_DocStringSeparator(token)
  assert token.matched_type == 'DocStringSeparator'
  assert token.matched_keyword == '```'
  assert token.matched_text == 'somefink'

def test_it_matches_4_ticks_doctring_separator():
  tm = GherkinInMarkdownTokenMatcher('en')
  line = GherkinLine('''  ````''',location['line'])
  t1 = Token(gherkin_line=line, location=location)
  assert tm.match_DocStringSeparator(t1)
  assert t1.matched_type == 'DocStringSeparator'
  assert t1.matched_keyword == '````'
  assert t1.matched_indent == 2
  assert t1.matched_text == ''

  t2 = Token(gherkin_line=GherkinLine('''  ```''',location['line']), location=location)
  assert tm.match_Other(t2)
  assert t2.matched_type == 'Other'
  assert t2.matched_keyword == None
  assert t2.matched_text == '```'

  t3 = Token(gherkin_line=GherkinLine('''  ````''',location['line']), location=location)
  assert tm.match_DocStringSeparator(t3)
  assert t3.matched_type == 'DocStringSeparator'
  assert t3.matched_keyword == '````'
  assert t1.matched_indent == 2
  assert t3.matched_text == ''



