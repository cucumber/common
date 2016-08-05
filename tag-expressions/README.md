# Tag Expressions

Tag Expressions provide a simple query language for tags. Example:

    @smoke and not @ui

Tag Expressions are used for two purposes:

1. Run a subset of scenarios (using the `--tags expression` option of the [command line](#))
2. Specify that a hook should only run for a subset of scenarios (using [tagged hooks](#))

Tag Expressions are simply [boolean expressions](https://en.wikipedia.org/wiki/Boolean_expression)
of tags with the logical operators `and`, `or` and `not`.

For more complex Tag Expressions you can use parenthesis for clarity, or to change operator precedence:

    (@smoke or @ui) and (not @slow)

## Implementation status

|               | Library implemented | Used by Cucumber |
|     :---      |         :---:       |      :---:       |
| .NET          |           ❌        |        ❌        |
| Go            |           ❌        |        ❌        |
| Java          |           ✅        |        ❌        |
| JavaScript    |           ✅        |        ❌        |
| Objective-C   |           ❌        |        ❌        |
| Perl          |           ❌        |        ❌        |
| Python        |           ❌        |        ❌        |
| Ruby          |           ❌        |        ❌        |

## Internal design

The implementation is based on a modified version of Edsger Dijkstra's
[Shunting Yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)
that produces an expression tree instead of a postfix notation.

For example this expression:

    expression = "not @a or @b and not @c or not @d or @e and @f"

Would parse into this expression tree:

    # Get the root of the tree - an Expression object.
    expressionNode = parser.parse(expression)

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

    result = expressionNode.evaluate(["@a", "@c", "@d"]) # => false
