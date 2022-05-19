# coding=utf-8
from gherkin.gherkin_line import GherkinLine
from gherkin.token_scanner import TokenScanner
from gherkin.token_matcher import TokenMatcher
from gherkin.parser import Parser
from gherkin.errors import ParserError
import pytest


class TestGherkin:
    def test_parser(self):
        parser = Parser()
        feature_file = parser.parse(TokenScanner("Feature: Foo"))
        expected = {
            'comments': [],
            'feature': {
                'keyword': 'Feature',
                'language': 'en',
                'location': {'column': 1, 'line': 1},
                'name': 'Foo',
                'description': '',
                'children': [],
                'tags': []
            },
        }

        assert expected == feature_file

    def test_parse_multiple_features(self):
        parser = Parser()
        ff1 = parser.parse(TokenScanner("Feature: 1"))
        ff2 = parser.parse(TokenScanner("Feature: 2"))

        assert "1" == ff1['feature']['name']
        assert "2" == ff2['feature']['name']

    def test_parse_feature_after_parser_error(self):
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
            'name': 'Bar',
            'description': '',
            'keyword': 'Scenario',
            'tags': [],
            'steps': [{
                'id': '0',
                'text': 'x',
                'location': {'column': 5, 'line': 3},
                'keyword': 'Given ',
                'docString': {
                    'content': 'closed docstring',
                    'delimiter': '"""',
                    'location': {'column': 7, 'line': 4}}}],
            'location': {'column': 3, 'line': 2},
            'examples': []}}]

        assert expected == feature_file['feature']['children']

    def test_change_the_default_language(self):
        parser = Parser()
        matcher = TokenMatcher('no')
        feature_file = parser.parse(TokenScanner("Egenskap: i18n support - åæø"), matcher)
        expected = {
            'comments': [],
            'feature': {
                'keyword': 'Egenskap',
                'language': 'no',
                'location': {'column': 1, 'line': 1},
                'name': 'i18n support - åæø',
                'description': '',
                'children': [],
                'tags': []
            },
        }

        assert expected == feature_file

    def test_can_invoked_with_no_args(self):
        assert Parser()


class TestGherkinLine:
    @staticmethod
    def _tags(line):
        return [tag["text"] for tag in GherkinLine(line, 12).tags]

    @staticmethod
    def _table_cells_text(line):
        return [cell["text"] for cell in GherkinLine(line, 12).table_cells]

    def test_allows_any_non_space_characters_in_a_tag(self):
        assert self._tags("   @foo:bar  @zap🥒yo") == ['@foo:bar', '@zap🥒yo']

    def test_table_cells_trims_whitespaces_before_cell_content(self):
        assert self._table_cells_text("|   \t spaces before|") == ['spaces before']

    def test_table_cells_trims_whitespaces_after_cell_content(self):
        assert self._table_cells_text("|spaces after   |") == ['spaces after']

    def test_table_cells_trims_whitespaces_around_cell_content(self):
        assert self._table_cells_text("|   \t spaces everywhere   \t|") == ['spaces everywhere']

    def test_table_cells_does_not_drop_whitespaces_inside_a_cell(self):
        assert self._table_cells_text("| foo()\n  bar\nbaz |") == ["foo()\n  bar\nbaz"]
