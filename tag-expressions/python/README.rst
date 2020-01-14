Cucumber Tag Expressions for Python
===============================================================================

.. image:: https://img.shields.io/travis/cucumber/tag-expressions-python/master.svg
    :target: https://travis-ci.org/cucumber/tag-expressions-python
    :alt: Travis CI Build Status

.. image:: https://img.shields.io/pypi/v/tag-expressions.svg
    :target: https://pypi.python.org/pypi/tag-expressions
    :alt: Latest Version

.. image:: https://img.shields.io/pypi/l/tag-expressions.svg
    :target: https://pypi.python.org/pypi/tag-expressions/
    :alt: License

.. |logo| image:: https://github.com/cucumber-ltd/brand/raw/master/images/png/notm/cucumber-black/cucumber-black-128.png

Cucumber tag-expressions for Python.

|logo|

Cucumber tag-expressions provide readable boolean expressions
to select features and scenarios marked with tags in Gherkin files
in an easy way::

    # -- SIMPLE TAG-EXPRESSION EXAMPLES:
    @a and @b
    @a or  @b
    not @a

    # -- MORE TAG-EXPRESSION EXAMPLES:
    @a and not @b
    (@a or @b) and not @c


SEE ALSO:

* https://cucumber.io/docs/cucumber/api/#tag-expressions
