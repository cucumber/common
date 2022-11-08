# coding=utf-8

import pytest
from gherkin.token import Token
from gherkin.token_matcher_markdown import GherkinInMarkdownTokenMatcher
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
    line = GherkinLine(u'''## Fonctionnalité: hello''',location['line'])
    token = Token(gherkin_line=line, location=location)
    assert tm.match_FeatureLine(token)
    assert token.matched_type == 'FeatureLine'
    assert token.matched_keyword == u'Fonctionnalité'
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

def test_it_matches_table_row_indented_2_spaces():
    tm = GherkinInMarkdownTokenMatcher('en')
    gherkin_line = GherkinLine('''  |foo|bar|''',location['line'])
    token = Token(gherkin_line, location)
    assert tm.match_TableRow(token)
    assert token.matched_type == 'TableRow'
    assert token.matched_keyword == '|'
    expected_items= [
       {'column': 4, 'text': 'foo'},
       {'column': 8, 'text': 'bar'}
    ]
    assert token.matched_items == expected_items

def test_it_matches_table_row_indented_5_spaces():
    tm = GherkinInMarkdownTokenMatcher('en')
    gherkin_line = GherkinLine('''     |foo|bar|''',location['line'])
    token = Token(gherkin_line, location)
    assert tm.match_TableRow(token)
    assert token.matched_type == 'TableRow'
    assert token.matched_keyword == '|'
    expected_items= [
       {'column': 7, 'text': 'foo'},
       {'column': 11, 'text': 'bar'}
    ]
    assert token.matched_items == expected_items

def test_it_does_not_match_table_row_indented_1_space():
    tm = GherkinInMarkdownTokenMatcher('en')
    gherkin_line = GherkinLine(''' |foo|bar|''',location['line'])
    token = Token(gherkin_line, location)
    assert not tm.match_TableRow(token)

def test_it_does_not_match_table_row_indented_6_space():
    tm = GherkinInMarkdownTokenMatcher('en')
    gherkin_line = GherkinLine('''      |foo|bar|''',location['line'])
    token = Token(gherkin_line, location)
    assert not tm.match_TableRow(token)

def test_it_matches_table_separator_row_as_comment():
    tm = GherkinInMarkdownTokenMatcher('en')

    l1 = GherkinLine('  | h1 | h2 |',location['line'])
    t1 = Token(l1,location)
    assert tm.match_TableRow(t1)

    l2 = GherkinLine('  | --- | --- |',location['line'])
    t2 = Token(l2,location)
    assert not tm.match_TableRow(t2)
    assert tm.match_Comment(t2)

def test_it_matches_indented_tags():
    tm = GherkinInMarkdownTokenMatcher('en')

    l1 = GherkinLine('  `@foo` `@bar`',location['line'])
    t1 = Token(l1,location)
    assert tm.match_TagLine(t1)

    assert t1.matched_type == 'TagLine'
    expected_items= [
       {'column': 4, 'text': '@foo'},
       {'column': 11, 'text': '@bar'}
    ]
    assert t1.matched_items == expected_items

def test_it_matches_unindented_tags():
    tm = GherkinInMarkdownTokenMatcher('en')

    l1 = GherkinLine('`@foo`   `@bar`',location['line'])
    t1 = Token(l1,location)
    assert tm.match_TagLine(t1)

    assert t1.matched_type == 'TagLine'
    expected_items= [
       {'column': 2, 'text': '@foo'},
       {'column': 11, 'text': '@bar'}
    ]
    assert t1.matched_items == expected_items


def test_it_matches_RuleLine():
    tm = GherkinInMarkdownTokenMatcher('en')
    line = GherkinLine('''## Rule: the world''',location['line'])
    token = Token(gherkin_line=line, location=location)
    assert tm.match_RuleLine(token)
    assert token.matched_type == 'RuleLine'
    assert token.matched_keyword == 'Rule'
    assert token.matched_text == 'the world'

def test_it_matches_ScenarioLine():
    tm = GherkinInMarkdownTokenMatcher('en')
    line = GherkinLine('''## Scenario: the one where''',location['line'])
    token = Token(gherkin_line=line, location=location)
    assert tm.match_ScenarioLine(token)
    assert token.matched_type == 'ScenarioLine'
    assert token.matched_keyword == 'Scenario'
    assert token.matched_text == 'the one where'

def test_it_matches_ScenarioLine_outline():
    tm = GherkinInMarkdownTokenMatcher('en')
    line = GherkinLine('''## Scenario Outline: the ones where''',location['line'])
    token = Token(gherkin_line=line, location=location)
    assert tm.match_ScenarioLine(token)
    assert token.matched_type == 'ScenarioLine'
    assert token.matched_keyword == 'Scenario Outline'
    assert token.matched_text == 'the ones where'

def test_it_matches_backgroundLine():
    tm = GherkinInMarkdownTokenMatcher('en')
    line = GherkinLine('''## Background: once upon a time''',location['line'])
    token = Token(gherkin_line=line, location=location)
    assert tm.match_BackgroundLine(token)
    assert token.matched_type == 'BackgroundLine'
    assert token.matched_keyword == 'Background'
    assert token.matched_text == 'once upon a time'

def test_it_matches_ExamplesLine():
    tm = GherkinInMarkdownTokenMatcher('en')
    line = GherkinLine('''## Examples: ''',location['line'])
    token = Token(gherkin_line=line, location=location)
    assert tm.match_ExamplesLine(token)
    assert token.matched_type == 'ExamplesLine'
    assert token.matched_keyword == 'Examples'
    assert token.matched_text == ''