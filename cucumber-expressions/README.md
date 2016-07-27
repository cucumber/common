# Cucumber Expressions

Cucumber Expressions are simple patterns for matching Step Definitions with
Gherkin steps.

(See the [implementations](IMPLEMENTATIONS.md) list to see if Cucumber Expressions
are what Cucumber implentations support Cucumber Expressions).

Cucumber Expressions are an alternative to [Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression)
that are easier to read and write for humans.

This is an example of a Cucumber Expression with a single argument `{n}`:

    I have {n} cukes in my belly

This expression would match the following Gherkin step text (The `Given ` keyword has been removed):

    I have 42 cukes in my belly

When this step is matched against the expression, the `{n}` argument would get the
value `"42"` and be passed to the Step Definition's body.

## Optional text

Optional text is simply surrounded by parenthesis:

    I have {n} cuke(s) in my belly

That expression would match this text:

    I have 2 cukes in my belly

It would also match this text (note the singular cuke):

    I have 1 cuke in my belly

## Type transformations

When arguments are extracted from a successful match, they can be converted
from strings to arbitrary types. Here is an example:

    I have {n:int} cukes in my belly

In this case the argument would be converted to `42` (an integer).
When the type is not specified, no type transformation happens, and
the argument is always a string.

The types you can specify in Cucumber Expressions are `int` and `float`, and any
additional numeric types available in your programming language.

### Statically typed languages

With statically typed programming languages the argument types can be derived
from the step definition body's signature. It is therefore not necessary to
declare the type in the Cucumber Expression.

Here is an example in Java:

```
Given("I have {n} cukes in my belly", (int n) -> {
  // no need to specify {n:int}
})
```

### Custom type transformations

You can also register your own types:

{% codetabs name="Java", type="java" -%}
TransformLookup transformLookup = new TransformLookup(Locale.ENGLISH);
transformLookup.addTransform(new FunctionTransform<>(
  Currency.class,
  singletonList("[A-Z]{3}"),
  Currency::getInstance
));
{%- language name="JavaScript", type="js" -%}
const transformLookup = new TransformLookup()
transformLookup.addTransform(new Transform(
  ['currency'],
  Currency,
  ['[A-Z]{3}'],
  s => new Currency(s)
))
{%- language name="Ruby", type="rb" -%}
transform_lookup = TransformLookup.new
transform_lookup.add_transform(Transform.new(
  ['currency'],
  Currency,
  ['[A-Z]{3}'],
  lambda { |s| Currency.new(s)}
))
{%- endcodetabs %}

With this in place you'll automatically get instances of Currency:

    I have a {currency:currency} account

### Regular Expression support

## Acknowledgements

The Cucumber Expression syntax is inspired by similar expression syntaxes in
other BDD tools, such as [Turnip](https://github.com/jnicklas/turnip), [Behat](https://github.com/Behat/Behat) and [Behave](https://github.com/behave/behave).

Big thanks to Jonas Nicklas, Konstantin Kudryashov and Jens Engel for the original
implementations.
