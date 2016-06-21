# Cucumber Tag Expressions

*This library is part of the Cucumber Standard Library - which hasn't yet been adopted by all Cucumber implementations*

This library implements a parser for infix boolean expressions, which is the
grammar used for Cucumber's tag expressions.

The implementation uses a modified version of
Edsger Dijkstra's [Shunting Yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) that produces an expression tree instead of a postfix notation.

Tag expressions are frequently used in [hooks](#) to declare what scenarios they
apply to.

Cucumber's configuration options (command line interface) also allows filtering
of what scenarios to run using `--tags "some tag expression"`

For example this expression:

    text = "not @a or @b and not @c or not @d or @e and @f"

Would parse into this expression tree:

    # Get the root of the tree - an Expression object.
    rootExpression = parser.parse(text)

                or
              /    \
            or      and
           /  \    /   \
         or  not  @e    @f
        /  \    \
      not  and   @d
     /    /   \
    @a   @b   not
                 \
                  @c

The root node of tree can then be evaluated for different combinations of tags.
For example:

    result = rootExpression.evaluate(["@a", "@c", "@d"]) # => false

Parsing and evaluation of tag expressions would happen in the parts of Cucumber
that implement tagged hooks and configuration options.
