# Cucumber Expressions

Cucumber Expressions are simple patterns for matching Step Definitions with
Gherkin steps.

## Implementation status

|               | Library implemented | Used by Cucumber |
|     :---      |         :---:       |      :---:       |
| .NET          |           ✅        |        ❌        |
| Go            |           ✅        |        ❌        |
| Java          |           ❌        |        ❌        |
| JavaScript    |           ❌        |        ❌        |
| Objective-C   |           ❌        |        ❌        |
| Perl          |           ❌        |        ❌        |
| Python        |           ❌        |        ❌        |
| Ruby          |           ❌        |        ❌        |

Cucumber Expressions provide an alternative to [Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression)
which is easier to read and write for humans.

This is an example of a Cucumber expression with a single argument `{n}`:

    I have {n} cukes in my belly

This expression would match the following Gherkin step text (The `Given ` keyword has been removed):

    I have 42 cukes in my belly

When this step is matched against the expression, the `{n}` argument would get the
value `"22"` and be passed to the step definition's body.

## Type transformations

Cucumber Expressions have built-in support for transformation of arguments to
arbitrary types.

### Expression types

The type of an argument can be specified within the expression:

    I have {n:int} cukes in my belly

In this case the argument would get the value `42` (an integer) instead of `"42"`
(a string).

The types you can specify in Cucumber Expressions are `int` and `float`, and any
additional numeric types available in your programming language.

### Explicit types

In statically typed programming languages the argument types can be derived
from the step definition body's parameters. Here is an example in Java:

```
Given("I have {n} cukes in my belly", (int n) -> {
})
```

### Custom type transforms

You can also register your own types:

```java
Cucumber.addTransform(new FunctionTransform<>(
  Currency.class,
  "[A-Z]{3}",
  Currency::parse
));
```
