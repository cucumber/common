# Cucumber Expressions

Cucumber Expressions are simple patterns for matching [Step Definitions](../docs/step-definitions.md)
with Gherkin steps.

Cucumber Expressions offer similar functionality to
[Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression), with the following improvements:

* Improved readability
* Custom parameter types
* Expression generation

## Introduction

Let's write a Cucumber Expression that matches the following text:

    I have 42 cucumbers in my belly

The simplest Cucumber Expression that matches that text would be the text itself,
but we can also write a slightly more generic one, with an `int` *parameter*:

    I have {int} cucumbers in my belly

When the text is matched against that expression, the number `42` is extracted
from the first (and only) parameter.

(Cucumber passes the extracted values as arguments to your [Step Definitions](../docs/step-definitions.md)).

The following text would not match the expression:

    I have 42.5 cucumbers in my belly

This is because `42.5` does not look like an `int` (integers don't have a decimal part).
Let's change the parameter to a `float` instead:

    I have {float} cucumbers in my belly

Now the expression will match the text, and the number `42.5` is extracted.

## Optional text

It's grammatically incorrect to say *1 cucumbers*, so we should make that `s`
optional. That can be done by surrounding the optional text with parenthesis:

    I have {int} cucumber(s) in my belly

That expression would match this text:

    I have 1 cucumber in my belly

It would also match this text:

    I have 42 cucumbers in my belly

## Alternative text

Sometimes you want to relax your language, to make it flow better. For example:

    I have {int} cucumber(s) in my belly/stomach

This would match either of those texts:

    I have 42 cucumbers in my belly
    I have 42 cucumbers in my stomach

## Custom parameter types {#custom-parameters}

Cucumber Expressions have built-in support for `int` and `float` parameter types
as well as other numeric types available in your programming language.

Defining your own parameter types is useful for several reasons:

1. Enforce certain patterns
1. Convert to custom types
1. Document and evolve your ubiquitous domain language

Imagine we want our parameter to match the colors `red`, `blue` or `yellow`
(but nothing else). Let's assume a `Color` class is already defined.
This is how we would define a custom `color` parameter:

{% method %}
{% sample lang="java" %}
```java
[snippet](java/src/test/java/io/cucumber/cucumberexpressions/CustomParameterTypeTest.java#add-color-parameter-type)
```
{% sample lang="js" %}
```javascript
[snippet](javascript/test/custom_parameter_type_test.js#add-color-parameter-type)
```

The `transform` function can also return a `Promise`:
```javascript
[snippet](javascript/test/custom_parameter_type_test.js#add-async-parameter-type)
```

{% sample lang="rb" %}
```ruby
[snippet](ruby/spec/cucumber/cucumber_expressions/custom_parameter_type_spec.rb#add-color-parameter-type)
```
{% endmethod %}

Now assume we have a Gherkin step with the following text following the step keyword:

    I have a red ball

This will now be matched by following Cucumber Expression:

    I have a {color} ball

Not only that, but the extracted argument will be of type `Color`.

The following text would not match the expression, because `green` isn't part
of the parameter definition.

    I have a green ball

## Preferential parameter types

In some cases you might want to define two or more parameter types with the same
regular expression, but different name and transform. For example, you may want
to define `name` and `person` parameter types with the regexp `[A-Z]+\w+`, which
would match `Joe`, `Amy` and so on.

This is fine, but if you use [Regular Expressions](#regular-expressions), Cucumber
will not know what parameter type to use to match (and transform) e.g. `Amy`.

In that case you can switch to using Cucumber Expressions, where parameters are
named, so there is no ambiguity.

Alternatively, you can continue to use Regular Expressions if you prefer, and
make one of the parameter types *preferential*. A preferential parameter type
will always be chosen over a non-preferential one.

When several parameter types share the same regexp, only one of them can be preferential.
If you try to make more than one preferential you will get an error.

## Implicit parameter types (statically typed languages only)

If a type  used in a step definition has a constructor that accepts a single
`String` argument, then there is no need to register a custom parameter for that type.

{% method %}
{% sample lang="java" %}
```java
[snippet](java/src/test/java/io/cucumber/cucumberexpressions/CustomParameterTypeTest.java#color-constructor)
```
{% endmethod %}

Registering a parameter is still beneficial, because it will allow Cucumber
to generate Cucumber Expression snippets for undefined steps using the correct type.

## Defining Parameter types without a transformer

If you don't specify a `transformer`, the matched arguments are returned as strings.
This is useful if you only want to use custom parameter types to match certain
patterns, but still want a string.

## Step Definition Snippets (Cucumber Expression generation)

When Cucumber encounters a [Gherkin step](../docs/gherkin.md#steps) without a
matching [Step Definition](../docs/step-definitions.md), it will print a step
Step Definition snippet with a matching Cucumber Expression that you can use as
a starting point.

Consider this Gherkin step:

    Given I have 3 red balls

If you had registered the [color](#custom-parameters) parameter above,
Cucumber would suggest a Step Definition with the following Cucumber Expression:

    I have {int} {color} balls

If you hadn't registered the `color` parameter, Cucumber would have suggested
the following Cucumber Expression (only the built-in `int` parameter would be
recognised):

    I have {int} red balls

If you register your own domain-specific parameters, Cucumber will generate
better snippets for you, and you'll also end up with a more consistent domain
language in your Gherkin scenarios.

## Regular Expressions {#regular-expressions}

Cucumber has a long relationship with Regular Expressions, and they are still
fully supported.

The Cucumber Expression library's Regular Expression support has automatic parameter
conversion just like Cucumber Expressions.

Imagine you have registered the (Color parameter above)[#custom-parameters],
and have a step definition with the following Regular Expression:

    I have a (red|blue|yellow) ball

The following Gherkin step would automatically convert to a `Color` instance:

    I have a red ball

Built-in parameters for `int` and `float` also apply. The following
Regular Expression would automatically convert arguments to `int`:

    I have (\d+) cukes in my belly

## For contributors

If you're contributing to Cucumber, you might be interested in how to use
Cucumber Expressions programmatically. Here are some pointers:

### Capturing match arguments

When a Gherkin step is matched against an expression
(`CucumberExpression` or `RegularExpression`), the result of the match is a list
of `Argument` (or `null`/`nil` if there was no match).

This API is similar to most regexp APIs, but the `Argument` type has additional
information:

* `value` - the string value of the match against the expression.
* `transformedValue` - the transformed value of the match (transformed by the parameter)
* `offset` - the offset from the start of the text where the value was found

Arguments are captured by creating an *expression*, and invoking `match` with a
string.

#### Capturing with CucumberExpression

{% method %}
{% sample lang="java" %}
```java
[snippet](java/src/test/java/io/cucumber/cucumberexpressions/CucumberExpressionTest.java#capture-match-arguments)
```
{% sample lang="js" %}
```javascript
[snippet](javascript/test/cucumber_expression_test.js#capture-match-arguments)
```
{% sample lang="rb" %}
```ruby
[snippet](ruby/spec/cucumber/cucumber_expressions/cucumber_expression_spec.rb#capture-match-arguments)
```
{% endmethod %}

#### Capturing with RegularExpression

{% method %}
{% sample lang="java" %}
```java
[snippet](java/src/test/java/io/cucumber/cucumberexpressions/RegularExpressionTest.java#capture-match-arguments)
```
{% sample lang="js" %}
```javascript
[snippet](javascript/test/regular_expression_test.js#capture-match-arguments)
```
{% sample lang="rb" %}
```ruby
[snippet](ruby/spec/cucumber/cucumber_expressions/regular_expression_spec.rb#capture-match-arguments)
```
{% endmethod %}

### Generating snippets

When Cucumber can't find a matching step definition, it will generate a snippet
of code. This snippet will have a suggested Cucumber Expression, and a function
signature with the appropriate type(s).

This information is in a `GeneratedExpression` object, which is generated by a
`CucumberExpressionGenerator`. The `CucumberExpressionGenerator` is aware of any
registered [parameters](#custom-parameters).

{% method %}
{% sample lang="java" %}
```java
[snippet](java/src/test/java/io/cucumber/cucumberexpressions/CucumberExpressionGeneratorTest.java#generate-expression)
```
{% sample lang="js" %}
```javascript
[snippet](javascript/test/cucumber_expression_generator_test.js#generate-expression)
```
{% sample lang="rb" %}
```ruby
[snippet](ruby/spec/cucumber/cucumber_expressions/cucumber_expression_generator_spec.rb#generate-expression)
```
{% endmethod %}

## Acknowledgements

The Cucumber Expression syntax is inspired by similar expression syntaxes in
other BDD tools, such as [Turnip](https://github.com/jnicklas/turnip), [Behat](https://github.com/Behat/Behat) and [Behave](https://github.com/behave/behave).

Big thanks to Jonas Nicklas, Konstantin Kudryashov and Jens Engel for
implementing those libraries.
