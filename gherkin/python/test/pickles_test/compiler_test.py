# coding=utf-8
from __future__ import print_function
import json
import textwrap

from gherkin.token_scanner import TokenScanner
from gherkin.token_matcher import TokenMatcher
from gherkin.parser import Parser
from gherkin.errors import ParserError
from gherkin.pickles import compiler

from nose.tools import assert_equals, assert_raises


def test_compiles_a_scenario():
    feature_text = textwrap.dedent(
        """\
        Feature: f
          Scenario: s
            Given passing
        """)
    output = Parser().parse(feature_text)
    pickle = compiler.compile(output)
    expected_pickle = textwrap.dedent(
        """\
        [
          {
            "name": "s",
            "steps": [
              {
                "text": "passing",
                "arguments": [],
                "locations": [
                  {
                    "line": 3,
                    "column": 11
                  }
                ]
              }
            ],
            "tags": [],
            "locations": [
              {
                "line": 2,
                "column": 3
              }
            ]
          }
        ]
        """
    )

    assert_equals(
        pickle,
        json.loads(expected_pickle)
    )


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
    output = Parser().parse(feature_text)
    pickle = compiler.compile(output)
    expected_pickle = textwrap.dedent(
        """\
        [
          {
            "name": "with 'é' in title",
            "steps": [
              {
                "text": "passing",
                "arguments": [],
                "locations": [
                  {
                    "line": 6,
                    "column": 5
                  },
                  {
                    "line": 3,
                    "column": 11
                  }
                ]
              }
            ],
            "tags": [],
            "locations": [
              {
                "line": 6,
                "column": 5
              },
              {
                "line": 2,
                "column": 3
              }
            ]
          }
        ]
        """
    )

    assert_equals(
        pickle,
        json.loads(expected_pickle)
    )
