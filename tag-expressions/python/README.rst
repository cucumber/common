Cucumber Tag Expressions for Python
===============================================================================

Cucumber tag-expressions provide readable boolean expressions
to select features and scenarios marked with tags in Gherkin files
in an easy way::

    # -- TAG-EXPRESSION EXAMPLES:

    @a and @b
    @a or  @b
    not @a

    @a and not @b
    (@a or @b) and not @c


SEE ALSO:
* `cucumber tag-expressions docs <http://docs.cucumber.io/tag-expressions/>`_
