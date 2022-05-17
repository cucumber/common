# coding=utf-8
from __future__ import print_function
import json
import textwrap

from gherkin.ast_builder import AstBuilder
from gherkin.parser import Parser
from gherkin.parser import Parser
from gherkin.errors import ParserError
from gherkin.pickles.compiler import Compiler
from gherkin.stream.id_generator import IdGenerator


def test_compiles_a_scenario():
    feature_text = textwrap.dedent(
        """\
        Feature: f
          Scenario: s
            Given passing
        """)
    id_generator = IdGenerator()
    gherkin_document = Parser(AstBuilder(id_generator)).parse(feature_text)
    gherkin_document['uri'] = 'uri'
    pickle = Compiler(id_generator).compile(gherkin_document)
    expected_pickle = textwrap.dedent(
        """\
        [
          {
            "id": "3",
            "astNodeIds": ["1"],
            "name": "s",
            "language": "en",
            "steps": [
              {
                "id": "2",
                "astNodeIds": ["0"],
                "text": "passing"
              }
            ],
            "tags": [],
            "uri": "uri"
          }
        ]
        """
    )

    assert pickle == json.loads(expected_pickle)


def test_compiles_a_scenario_outline_with_i18n_characters():
    feature_text = textwrap.dedent(
        """\
        Feature: f
          Scenario Outline: with 'é' in title
            Given <with-é>
            Examples:
            | with-é  |
            | passing |
        """)
    id_generator = IdGenerator()
    gherkin_document = Parser(AstBuilder(id_generator)).parse(feature_text)
    gherkin_document['uri'] = 'uri'
    pickle = Compiler(id_generator).compile(gherkin_document)
    expected_pickle = textwrap.dedent(
        """\
        [
          {
            "id": "6",
            "astNodeIds": ["4", "2"],
            "name": "with 'é' in title",
            "language": "en",
            "steps": [
              {
                "id": "5",
                "astNodeIds": ["0", "2"],
                "text": "passing"
              }
            ],
            "tags": [],
            "uri": "uri"
          }
        ]
        """
    )

    assert pickle == json.loads(expected_pickle)
