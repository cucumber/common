# -*- coding: UTF-8 -*-
"""
Python implementation of `cucumber tag-expressions`_.

Tag-expressions are used in cucumber, behave and other BDD frameworks
to select features, scenarios, etc. in `Gherkin`_ files.
Theses selected items are normally included in a test run.

.. see also:: https://docs.cucumber.io/cucumber/api/#tag-expressions

.. _`cucumber tag-expressions`: https://docs.cucumber.io/cucumber/api/#tag-expressions
.. _`Gherkin`: https://docs.cucumber.io/gherkin/reference/
.. _`behave: Gherkin`: https://behave.readthedocs.io/en/latest/philosophy.html#the-gherkin-language
"""

from __future__ import absolute_import
from .parser import parse, TagExpressionParser, TagExpressionError

__version__ = "1.1.2"
