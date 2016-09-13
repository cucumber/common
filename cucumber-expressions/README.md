# Cucumber Expressions

Cucumber Expressions are simple patterns for matching Step Definitions with
Gherkin steps.

Cucumber Expressions is a human friendly alternative to [Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression).

Cucumber Expressions trade the flexibility and power of Regular Expressions with
vastly improved readability. Cucumber Expressions also offer additional functionality,
such as automatic [type transformation](#type-transforms).

This is an example of a Cucumber Expression with a single argument `{n}`:

    I have {n} cukes in my belly

This expression would match the text of the following [Gherkin Step](../docs/gherkin.md#steps) (The part after the `Given ` keyword):

    I have 42 cukes in my belly

When this text is matched against the expression, the `{n}` argument would get the
value `"42"` and be passed to the body of the [Step Definition](../docs/step-definitions.md).

(The [standard library](../docs/standard-library.adoc#implementations) list indicates
what Cucumber implementations currently support Cucumber Expressions).

## Optional Text

Optional text is simply surrounded by parenthesis:

    I have {n} cuke(s) in my belly

That expression would still match this text:

    I have 42 cukes in my belly

But it would also match this text (note the singular cuke):

    I have 1 cuke in my belly

## Type Transforms {#type-transforms}

Arguments extracted from a successful match are strings by default. In many cases
you want the type of the argument to be something else, and you can specify the
desired type:

    I have {n:int} cukes in my belly

In this case the argument would be converted to the integer `42` instead.

Cucumber Expressions have built-in support for `int` and `float` types, and any
additional numeric types available in your programming language. You can easily
add support for [custom type transforms](#custom-type-transforms).

### Statically Typed Languages

Statically typed programming languages make it possible to determine the argument
types from the step definition body's signature instead of the Cucumber Expression.

Here is an example in Java:

```java
Given("I have {n} cukes in my belly", (int n) -> {
  // no need to specify {n:int} - the signature makes that explicit.
})
```

### Custom Type Transforms {#custom-type-transforms}

The built-in transforms are handy, but you'll often want to register
transforms for additional types:

{% method %}
{% sample lang="java" %}
```java
transformLookup.addTransform(new SimpleTransform<>(
  "currency",
  Currency.class,
  "[A-Z]{3}",
  new Function<String, Currency>() {
    @Override
    public Currency apply(String currencyCode) {
      return Currency.getInstance(currencyCode);
    }
  }
));
```

{% sample lang="js" %}
```javascript
transformLookup.addTransform(new Transform(
  'currency',
  Currency,
  ['[A-Z]{3}'],
  s => new Currency(s)
))
```

{% sample lang="rb" %}
```ruby
transform_lookup.add_transform(Transform.new(
  'currency',
  Currency,
  ['[A-Z]{3}'],
  lambda { |s| Currency.new(s) }
))
```
{% endmethod %}

With this in place you'll automatically get instances of `Currency`:

    I have a {currency:currency} account

If the argument name is the same as the type name, you don't need to specify
the type name - it will be derived from the argument name instead:

    I have a {currency} account

### Implicit Transforms

If you're using a statically typed language, and your type constructor accepts
a single `String` argument, then an instance of that type will be created even
if no custom transform is registered:

    I have a {color} ball

If the signature of the Step Definition is, say `(Color)`, then you'll get an instance
of that class as long as the type has a constructor with signature `(String)`.

Registering an explicit transform is still beneficial, because it will allow Cucumber
to suggest snippets for undefined steps with the correct type.

## Step Definition Snippets

When Cucumber encounters a [Gherkin step](../docs/gherkin.md#steps) without a
matching [Step Definition](#), it will print a code snippet with a matching
step definition that you can use as a starting point. Consider this Gherkin step:

    Given I have 2 red balls

Cucumber would suggest a Step Definition with the following Cucumber Expression:

    I have {arg1:int} red balls

### Snippets for Custom Transforms

You may have a `Color` class that you want to use to capture the `red` part of the
step, but unless you register a transform for that class, Cucumber won't be able
to recognise that. Let's register a transform for `Color`:

{% method %}
{% sample lang="java" %}
```java
transformLookup.addTransform(new SimpleTransform<>(
  "color",
  Color.class,
  "red|blue|yellow",
  new Function<String, Color>() {
    @Override
    public Color apply(String color) {
      return new Color(color);
    }
  }
));
```

{% sample lang="js" %}
```javascript
transformLookup.addTransform(new Transform(
  'color',
  Color,
  'red|blue|yellow',
  s => new Color(s)
))
```

{% sample lang="rb" %}
```ruby
transform_lookup.add_transform(Transform.new(
  'color',
  Color,
  'red|blue|yellow',
  lambda { |s| Color.new(s) }
))
```
{% endmethod %}

With this transform registered, we can ask Cucumber to generate a snippet again:

    Given I have 2 red balls

This time, Cucumber would recognise that `red` looks like a `color` and suggest
a Step Definition snippet with the following Cucumber Expression:

    Given I have {arg1:int} {arg2:color} balls

## Regular Expressions

Cucumber has a long relationship with Regular Expressions, and they can still be
used instead of instead of Cucumber Expressions if you prefer.

The Cucumber Expression library's Regular Expression support has automatic type
conversion just like Cucumber Expressions.

In the `Currency` example above, the following Regular Expression would cause
automatic conversion to `Currency`:

    I have a ([A-Z]{3}) account

This also applies to the built-in conversions for `int` and `float`. The following
Regular Expression would automatically convert the argument to `int`:

    I have (\d+) cukes in my belly

## Test Coverage

The `Cucumber Expressions` library has 100% test coverage for all implementations.

## Acknowledgements

The Cucumber Expression syntax is inspired by similar expression syntaxes in
other BDD tools, such as [Turnip](https://github.com/jnicklas/turnip), [Behat](https://github.com/Behat/Behat) and [Behave](https://github.com/behave/behave).

Big thanks to Jonas Nicklas, Konstantin Kudryashov and Jens Engel for the original
implementations.
