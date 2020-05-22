# -*- coding: UTF-8 -*-
# pylint: disable=missing-docstring
"""
Provides model classes to evaluate parsed boolean tag expressions.

.. code-block:: python

    # -- Expression := a and b
    expression = And(Literal("a"), Literal("b"))
    assert True  == expression.evaluate(["a", "b"])
    assert False == expression.evaluate(["a"])
    assert False == expression.evaluate([])

    # -- Expression := a or b
    expression = Or(Literal("a"), Literal("b"))
    assert True  == expression.evaluate(["a", "b"])
    assert True  == expression.evaluate(["a"])
    assert False == expression.evaluate([])

    # -- Expression := not a
    expression = Not(Literal("a"))
    assert False == expression.evaluate(["a"])
    assert True  == expression.evaluate(["other"])
    assert True  == expression.evaluate([])

    # -- Expression := (a or b) and c
    expression = And(Or(Literal("a"), Literal("b")), Literal("c"))
    assert True  == expression.evaluate(["a", "c"])
    assert False == expression.evaluate(["c", "other"])
    assert False == expression.evaluate([])
"""


# -----------------------------------------------------------------------------
# TAG-EXPRESSION MODEL CLASSES:
# -----------------------------------------------------------------------------
class Expression(object):
    """Abstract base class for boolean expression terms of a tag-expression
    (or representing a parsed tag-expression (evaluation-tree)).
    """
    # pylint: disable=too-few-public-methods

    def evaluate(self, values):
        raise NotImplementedError()

    def __call__(self, values):
        """Call operator to make an expression-object callable."""
        return bool(self.evaluate(values))


class Literal(Expression):
    """Used as placeholder for a tag in a boolean tag-expression."""
    # pylint: disable=too-few-public-methods
    def __init__(self, name):
        super(Literal, self).__init__()
        self.name = name

    def evaluate(self, values):
        truth_value = self.name in set(values)
        return bool(truth_value)

    def __str__(self):
        return self.name

    def __repr__(self):
        return "Literal('%s')" % self.name


class And(Expression):
    """Boolean-and operation (as binary operation).

    NOTE: Class supports more than two arguments.
    """
    # pylint: disable=too-few-public-methods
    def __init__(self, *terms):
        super(And, self).__init__()
        self.terms = terms

    def evaluate(self, values):
        values_ = set(values)
        for term in self.terms:
            truth_value = term.evaluate(values_)
            if not truth_value:
                # -- SHORTCUT: Any false makes the expression false.
                return False
        # -- OTHERWISE: All terms are true.
        return True
        # -- ALTERNATIVE:
        # return all([term.evaluate(values_) for term in self.terms])

    def __str__(self):
        if not self.terms:
            return ""       # noqa
        expression_text = " and ".join([str(term) for term in self.terms])
        return "( %s )" % expression_text

    def __repr__(self):
        return "And(%s)" % ", ".join([repr(term) for term in self.terms])


class Or(Expression):
    """Boolean-or operation (as binary operation).

    NOTE: Class supports more than two arguments.
    """
    # pylint: disable=too-few-public-methods

    def __init__(self, *terms):
        super(Or, self).__init__()
        self.terms = terms

    def evaluate(self, values):
        values_ = set(values)
        for term in self.terms:
            truth_value = term.evaluate(values_)
            if truth_value:
                # -- SHORTCUT: Any true makes the expression true.
                return True
        # -- OTHERWISE: All terms are false.
        return False
        # -- ALTERNATIVE:
        # return any([term.evaluate(values_) for term in self.terms])

    def __str__(self):
        if not self.terms:
            return ""       # noqa
        expression_text = " or ".join([str(term) for term in self.terms])
        return "( %s )" % expression_text

    def __repr__(self):
        return "Or(%s)" % ", ".join([repr(term) for term in self.terms])


class Not(Expression):
    """Boolean-not operation (as unary operation)."""
    # pylint: disable=too-few-public-methods

    def __init__(self, term):
        super(Not, self).__init__()
        self.term = term

    def evaluate(self, values):
        values_ = set(values)
        return not self.term.evaluate(values_)

    def __str__(self):
        return "not ( %s )" % self.term

    def __repr__(self):
        return "Not(%r)" % self.term


class True_(Expression):    # pylint: disable=invalid-name
    """Boolean expression that is always true."""
    # pylint: disable=too-few-public-methods

    def evaluate(self, values):
        return True

    def __str__(self):
        return "true"

    def __repr__(self):
        return "True_()"
