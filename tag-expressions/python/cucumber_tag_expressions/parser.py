# -*- coding: UTF-8 -*-
# pylint: disable=missing-docstring
"""
Provides parsing of boolean tag expressions.

.. code-block:: python

    expression = TagExpressionParser.parse("a and (b or not c)")
    assert True == expression.evaluate(["a", "other"])
    assert "( a and ( b or not (c) ) )" == str(expression)

UNSUPPORTED:
* Support special tags w/ escaped-parens: ``@reqid\(10\)``
"""

from __future__ import absolute_import
from enum import Enum
from cucumber_tag_expressions.model import Literal, And, Or, Not, True_


# -----------------------------------------------------------------------------
# OPTIMIZER
# -----------------------------------------------------------------------------
# class TagExpressionOptimizer(object):
#
#     def rule_combine_and_ops(self, expression):
#         terms = getattr(expression, "terms", None)
#         if not terms:
#             return
#
#         for term in terms:
#
#     def rule_combine_or_ops(self, expression):
#         pass


# -----------------------------------------------------------------------------
# GRAMMAR DEFINITIONS:
# -----------------------------------------------------------------------------
class Associative(Enum):
    """Describes associativity of boolean operations."""
    # pylint: disable=too-few-public-methods
    LEFT = 1
    RIGHT = 2


class TokenType(Enum):
    OPERAND = 0
    OPERATOR = 1


class Token(Enum):
    """Describes tokens and their abilities for tag-expression parsing."""
    # pylint: disable=bad-whitespace
    # MAYBE: _order_ = "OR AND NOT OPEN_PARENTHESIS CLOSE_PARENTHESIS"
    OR  = ("or",  0, Associative.LEFT,  TokenType.OPERATOR)
    AND = ("and", 1, Associative.LEFT,  TokenType.OPERATOR)
    NOT = ("not", 2, Associative.RIGHT, TokenType.OPERATOR)
    OPEN_PARENTHESIS  = ("(", -2) # Java, Javascript: -2, Ruby: 1
    CLOSE_PARENTHESIS = (")", -1)

    def __init__(self, keyword, precedence, assoc=None, token_type=TokenType.OPERAND):
        self.keyword = keyword
        self.precedence = precedence
        self.assoc = assoc
        self.token_type = token_type

    @property
    def is_operation(self):
        return self.token_type is TokenType.OPERATOR

    @property
    def is_binary(self):
        return self in (Token.OR, Token.AND)

    @property
    def is_unary(self):
        return self is Token.NOT

    def has_lower_precedence_than(self, other):
        """Checks if this token has lower precedence than other token."""
        # -- pylint: disable=line-too-long
        return (
            ((self.assoc == Associative.LEFT) and (self.precedence <= other.precedence)) or
            ((self.assoc == Associative.RIGHT) and (self.precedence < other.precedence))
        )

    def matches(self, text):
        return self.keyword == text

    # def __eq__(self, other):
    #     if isinstance(other, six.string_types):
    #         # -- CONVENIENCE: token == "and"
    #         return self.matches(other)
    #     # -- OTHERWISE:
    #     return self is other


# -----------------------------------------------------------------------------
# PARSE ERRORS
# -----------------------------------------------------------------------------
class TagExpressionError(Exception):
    """Raised by parser if an invalid tag-expression is detected."""


# -----------------------------------------------------------------------------
# PARSER
# -----------------------------------------------------------------------------
class TagExpressionParser(object):
    """Parser class to parse boolean tag-expressions.
    This class uses the `Shunting Yard algorithm`_ to parse the tag-expression.

    Boolean operations:

    * and (as binary operation:  a and b)
    * or  (as binary operation:  a or b)
    * not (as unary operation:   not a)

    In addition, parenthesis can be used to group expressions, like::

        a and (b or c)
        (a and not b) or (c and d)

    EXAMPLES:

    .. code-block:: python

        # -- UNARY OPTIONS
        text11 = "not foo" = "(not foo)"
        expression = TagExpressionParser.parse(text11)
        assert False == expression.evaluate(["foo"])
        assert True  == expression.evaluate(["other"])

        # -- BINARY OPERATIONS:
        text21 = "foo and bar" = "(foo and bar)"
        expression = TagExpressionParser.parse(text21)
        assert True  == expression.evaluate(["foo", "bar"])
        assert False == expression.evaluate(["foo"])
        assert False == expression.evaluate([])

        text22 = "foo or bar"  = "(foo or bar)"
        expression = TagExpressionParser.parse(text22)
        assert True  == expression.evaluate(["foo", "bar"])
        assert True  == expression.evaluate(["foo", "other"])
        assert False == expression.evaluate([])

    .. see::

        * `Shunting Yard algorithm`_
        * http://rosettacode.org/wiki/Parsing/Shunting-yard_algorithm

    .. _`Shunting Yard algorithm`: https://en.wikipedia.org/wiki/Shunting-yard_algorithm
    """
    # pylint: disable=too-few-public-methods
    TOKEN_MAP = {token.keyword: token
                 for token in Token.__members__.values()}

    @classmethod
    def select_token(cls, text):
        """Select the token that matches the text or return None.

        :param text: Text to select the matching token.
        :return: Token object or None, if not found.
        """
        return cls.TOKEN_MAP.get(text, None)

    @classmethod
    def make_operand(cls, text):
        """Creates operand-object from parsed text."""
        # -- EXTENSION-POINT: For #406 or similar.
        return Literal(text)

    @classmethod
    def parse(cls, text):
        """Parse a textual tag-expression and return the expression (tree).

        :param text: Textual tag-expression (as string).
        :return: Tag expression (instance of :class:`Expression`).
        :raises: TagExpressionError, if the tag-expression is invalid.
        """
        # pylint: disable=too-many-branches
        # -- NOTE: Use whitespace-split to simplify tokenizing.
        #    This makes opening-/closing-parenthesis easier to parse.
        parts = text.replace("(", " ( ").replace(")", " ) ").strip().split()
        if not parts:
            #  -- CASE: Empty tag-expression is always true.
            return True_()

        def ensure_expected_token_type(token_type):
            if expected_token_type != token_type:
                message = "Syntax error. Expected %s after %s" % \
                          (expected_token_type.name.lower(), last_part)
                message = cls._make_error_description(message, parts, index)
                raise TagExpressionError(message)

        operations = []     # TOKENS: AND, OR, NOT, OPEN_PAREN, CLOSE_PAREN
        expressions = []    # Finished expressions (And, Or, Not) and Literals
        last_part = "BEGIN"
        expected_token_type = TokenType.OPERAND

        for index, part in enumerate(parts):
            token = cls.select_token(part)
            if token is None:
                # -- CASE OPERAND: Literal or ...
                ensure_expected_token_type(TokenType.OPERAND)
                expressions.append(cls.make_operand(part))
                expected_token_type = TokenType.OPERATOR
            elif token.is_unary:
                ensure_expected_token_type(TokenType.OPERAND)
                operations.append(token)
                expected_token_type = TokenType.OPERAND
            elif token.is_operation:
                ensure_expected_token_type(TokenType.OPERATOR)
                while (operations and operations[-1].is_operation and
                       token.has_lower_precedence_than(operations[-1])):
                    last_operation = operations.pop()
                    cls._push_expression(last_operation, expressions)
                operations.append(token)
                expected_token_type = TokenType.OPERAND
            elif token is Token.OPEN_PARENTHESIS:
                ensure_expected_token_type(TokenType.OPERAND)
                operations.append(token)
                expected_token_type = TokenType.OPERAND
            elif token is Token.CLOSE_PARENTHESIS:
                ensure_expected_token_type(TokenType.OPERATOR)
                while operations and operations[-1] != Token.OPEN_PARENTHESIS:
                    last_operation = operations.pop()
                    cls._push_expression(last_operation, expressions)

                if not operations:
                    # -- CASE: TOO FEW OPEN-PARENTHESIS
                    message = "Missing '(': Too few open-parens in: %s" % text
                    message = cls._make_error_description(message, parts, index)
                    raise TagExpressionError(message)
                elif operations[-1] is Token.OPEN_PARENTHESIS:
                    operations.pop()
                    expected_token_type = TokenType.OPERATOR
            last_part = part    # BETTER DIAGNOSTICS: Remember last part.

        # -- PROCESS REMAINING OPERATIONS:
        while operations:
            last_operation = operations.pop()
            if last_operation is Token.OPEN_PARENTHESIS:
                # -- CASE: TOO MANY OPEN-PARENTHESIS
                message = "Unclosed '(': Too many open-parens in: %s" % text
                raise TagExpressionError(message)
            cls._push_expression(last_operation, expressions)

        # -- FINALLY: Return boolean tag-expression.
        assert len(expressions) == 1
        expression = expressions.pop()
        return expression


    @staticmethod
    def _push_expression(token, expressions):
        """Push a new boolean-expression on the expression-stack.

        Retrieves operands for operation from the expression-stack and
        pushes the new expression onto it.

        :param token:  Token for new expression (instance of class:`Token`).
        :param expressions: Expression stack to use (as inout param).
        :raises: TagExpressionError, if too few args are in expression-stack.
        """
        def require_argcount(number):
            # -- IMPROVED DIAGNOSTICS: When things go wrong (and where).
            if len(expressions) < number:
                message = "%s: Too few operands (expressions=%r)"
                raise TagExpressionError(message % (token.keyword, expressions))

        if token is Token.OR:
            require_argcount(2)
            term2 = expressions.pop()
            term1 = expressions.pop()
            expressions.append(Or(term1, term2))
        elif token is Token.AND:
            require_argcount(2)
            term2 = expressions.pop()
            term1 = expressions.pop()
            expressions.append(And(term1, term2))
        elif token is Token.NOT:
            require_argcount(1)
            term = expressions.pop()
            expressions.append(Not(term))
        else:
            raise TagExpressionError("Unexpected token: %r" % token)    # noqa
            # expressions.append(Literal(token))

    @staticmethod
    def _make_error_description(message, parts, error_index):
        if error_index > len(parts):
            error_index = len(parts)    # noqa
        good_text_size = len(" ".join(parts[:error_index]))
        error_pos = len("Expression: ") + good_text_size + 1
        template = "Expression: {expression}\n%s^ (HERE)" % ("_" * error_pos)
        if message:                     # noqa
            template = "{message}\n" + template
        expression = " ".join(parts)
        return template.format(message=message, expression=expression)


# ----------------------------------------------------------------------------
# CONVENIENCE FUNCTIONS:
# ----------------------------------------------------------------------------
def parse(text):
    """Parse a tag-expression as text and return the expression tree.

    .. code-block:: python

        tags = ["foo", "bar"]
        tag_expression = parse("foo and bar or not baz")
        assert tag_expression.evaluate(tags) == True

    :param text:    Tag expression as text to parse.
    :param parser_class:  Optional p
    :return: Parsed expression
    """
    return TagExpressionParser.parse(text)
