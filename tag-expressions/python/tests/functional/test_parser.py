# -*- coding: UTF-8 -*-
# pylint: disable=bad-whitespace
"""
Functional tests for ``TagExpressionParser.parse()`` and ``Expression.evaluate()``.
"""

from cucumber_tag_expressions.parser import TagExpressionParser
import pytest


# -----------------------------------------------------------------------------
# TEST SUITE: TagExpressionParser.parse() and Expression.evaluate(tags) chain
# -----------------------------------------------------------------------------
class TestParseAndEvaluate(object):
    # correct_test_data = [
    #     ("a and b", "( a and b )"),
    #     ("a or (b)", "( a or b )"),
    #     ("not   a", "not ( a )"),
    #     ("( a and b ) or ( c and d )", "( ( a and b ) or ( c and d ) )"),
    #     ("not a or b and not c or not d or e and f",
    #         "( ( ( not ( a ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )"),
    # ]

    @pytest.mark.parametrize("tag_expression_text, expected, tags, case", [
        ("a and b",  True, ["a", "b"],          "both tags"),
        ("a and b",  True, ["a", "b", "other"], "both tags and more"),
        ("a and b", False, ["a"],       "one tag: a"),
        ("a and b", False, ["b"],       "one tag: b"),
        ("a and b", False, ["other"],   "one tag: other"),
        ("a and b", False, [],          "no_tags"),
    ])
    def test_and_operation(self, tag_expression_text, expected, tags, case):
        tag_expression = TagExpressionParser.parse(tag_expression_text)
        assert expected == tag_expression.evaluate(tags)

    @pytest.mark.parametrize("tag_expression_text, expected, tags, case", [
        ("a or b",  True, ["a", "b"],           "both tags"),
        ("a or b",  True, ["a", "b", "other"], "both tags and more"),
        ("a or b",  True, ["a"],        "one tag: a"),
        ("a or b",  True, ["b"],        "one tag: b"),
        ("a or b", False, ["other"],    "one tag: other"),
        ("a or b", False, [],           "no_tags"),
    ])
    def test_or_operation(self, tag_expression_text, expected, tags, case):
        tag_expression = TagExpressionParser.parse(tag_expression_text)
        assert expected == tag_expression.evaluate(tags)

    @pytest.mark.parametrize("tag_expression_text, expected, tags, case", [
        ("not a", False, ["a", "other"], "two tags: a, other"),
        ("not a", False, ["a"],     "one tag: a"),
        ("not a",  True, ["other"], "one tag: other"),
        ("not a",  True, [],        "no_tags"),
    ])
    def test_not_operation(self, tag_expression_text, expected, tags, case):
        tag_expression = TagExpressionParser.parse(tag_expression_text)
        assert expected == tag_expression.evaluate(tags)

    @pytest.mark.parametrize("tag_expression_text, expected, tags, case", [
        ("a",  True, ["a", "other"], "two tags: a, other"),
        ("a",  True, ["a"],         "one tag: a"),
        ("a", False, ["other"],     "one tag: other"),
        ("a", False, [],            "no_tags"),
    ])
    def test_literal(self, tag_expression_text, expected, tags, case):
        tag_expression = TagExpressionParser.parse(tag_expression_text)
        assert expected == tag_expression.evaluate(tags)

    @pytest.mark.parametrize("tag_expression_text, expected, tags, case", [
        ("",  True, [],            "no_tags"),
        ("",  True, ["a"],         "one tag: a"),
        ("",  True, ["other"],     "one tag: other"),
    ])
    def test_empty_expression_is_true(self, tag_expression_text, expected, tags, case):
        tag_expression = TagExpressionParser.parse(tag_expression_text)
        assert expected == tag_expression.evaluate(tags)

    # NOTE: CANDIDATE for property-based testing
    @pytest.mark.parametrize("tag_expression_text, expected, tags, case", [
        ("a and b",  True, ["a", "b"], "two tags: a, b"),
        ("a and b", False, ["a"],      "one tag: a"),
        ("a and b", False, [],         "no_tags"),
        ("a or b",   True, ["a", "b"],  "two tags: a, b"),
        ("a or b",   True, ["b"],       "one tag: b"),
        ("a or b",  False, [],          "no_tags"),
        ("a and b or c",  True, ["a", "b", "c"],     "three tags: a, b, c"),
        ("a and b or c",  True, ["a", "other", "c"], "three tags: a, other, c"),
        ("a and b or c",  True, ["a", "b", "other"], "three tags: a, b, other"),
        ("a and b or c",  True, ["a", "b"], "two tags: a, b"),
        ("a and b or c",  True, ["a", "c"], "two tags: a, c"),
        ("a and b or c", False, ["a"],      "one tag: a"),
        ("a and b or c",  True, ["c"],      "one tag: c"),
        ("a and b or c", False, [],         "not tags"),
    ])
    def test_not_not_expression_sameas_expression(self, tag_expression_text, expected, tags, case):
        not2_tag_expression_text = "not not "+ tag_expression_text
        tag_expression1 = TagExpressionParser.parse(tag_expression_text)
        tag_expression2 = TagExpressionParser.parse(not2_tag_expression_text)
        value1 = tag_expression1.evaluate(tags)
        value2 = tag_expression2.evaluate(tags)
        assert value1 == value2
        assert expected == value1
