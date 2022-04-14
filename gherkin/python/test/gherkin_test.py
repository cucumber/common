# coding=utf-8
from gherkin.token_scanner import TokenScanner
from gherkin.token_matcher import TokenMatcher
from gherkin.parser import Parser
from gherkin.errors import ParserError
import pytest


def test_parser():
    parser = Parser()
    feature_file = parser.parse(TokenScanner("Feature: Foo"))
    expected = {
        'comments': [],
        'feature': {
            'keyword': u'Feature',
            'language': 'en',
            'location': {'column': 1, 'line': 1},
            'name': u'Foo',
            'description': '',
            'children': [],
            'tags': []
        },
    }

    assert expected == feature_file


def test_parse_multiple_features():
    parser = Parser()
    ff1 = parser.parse(TokenScanner("Feature: 1"))
    ff2 = parser.parse(TokenScanner("Feature: 2"))

    assert "1" == ff1['feature']['name']
    assert "2" == ff2['feature']['name']


def test_parse_feature_after_parser_error():
    parser = Parser()
    with pytest.raises(ParserError):
        parser.parse(TokenScanner('# a comment\n' +
                                  'Feature: Foo\n' +
                                  '  Scenario: Bar\n' +
                                  '    Given x\n' +
                                  '      ```\n' +
                                  '      unclosed docstring\n'))
    feature_file = parser.parse(TokenScanner('Feature: Foo\n' +
                                             '  Scenario: Bar\n' +
                                             '    Given x\n'
                                             '      """\n'
                                             '      closed docstring\n'
                                             '      """\n'))
    expected = [{'scenario': {
        'id': '1',
        'name': u'Bar',
        'description': '',
        'keyword': u'Scenario',
        'tags': [],
        'steps': [{
            'id': '0',
            'text': u'x',
            'location': {'column': 5, 'line': 3},
            'keyword': u'Given ',
            'docString': {
                'content': u'closed docstring',
                'delimiter': '"""',
                'location': {'column': 7, 'line': 4}}}],
        'location': {'column': 3, 'line': 2},
        'examples': []}}]

    assert expected == feature_file['feature']['children']


def test_change_the_default_language():
    parser = Parser()
    matcher = TokenMatcher('no')
    feature_file = parser.parse(TokenScanner("Egenskap: i18n support - åæø"), matcher)
    expected = {
        'comments': [],
        'feature': {
            'keyword': u'Egenskap',
            'language': 'no',
            'location': {'column': 1, 'line': 1},
            'name': u'i18n support - åæø',
            'description': '',
            'children': [],
            'tags': []
        },
    }

    assert expected == feature_file
