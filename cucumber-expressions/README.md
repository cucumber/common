# Cucumber Expressions

Cucumber Expressions are simple patterns for matching [Step Definitions](../docs/step-definitions.md)
with Gherkin steps.

Cucumber Expressions trade the flexibility and power of
[Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression)
with vastly improved readability. Cucumber Expressions also offer additional functionality,
such as automatic [type transformation](#type-transforms).

This is an example of a Cucumber Expression with a single parameter `n`:

    I have {n} cukes in my belly

This expression would match the text of the following [Gherkin Step](../docs/gherkin.md#steps) (The part after the `Given ` keyword):

    I have 42 cukes in my belly

When this text is matched against the expression, the string `"42"`, is passed
as an argument to the [Step Definition](../docs/step-definitions.md) body.

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
desired type after the parameter:

    I have {n:int} cukes in my belly

In this case the argument would be converted to the integer `42` instead.

Cucumber Expressions have built-in support for `int` and `float` types, and any
additional numeric types available in your programming language.

You can easily add support for [custom type transforms](#custom-type-transforms).

### Custom Type Transforms {#custom-type-transforms}

The built-in transforms are handy for numeric types, but you'll often want to register
transforms for additional types. For instance, we can register a transform for
a `Color` type:

{% method %}
{% sample lang="java" %}
```java
[snippet](java/src/test/java/io/cucumber/cucumberexpressions/CustomTransformTest.java#add-color-transform)
```
{% sample lang="js" %}
```javascript
[snippet](javascript/test/custom_transform_test.js#add-color-transform)
```
{% sample lang="rb" %}
```ruby
[snippet](ruby/spec/cucumber/cucumber_expressions/custom_transform_spec.rb#add-color-transform)
```
{% endmethod %}

The Cucumber Expression

    I have a {color:color} ball

would match the following text and pass a `Color` object to the step definition:

    I have a red ball

If the parameter name is the same as the type name, you don't need to specify
the type name - it will be derived from the argument name instead:

    I have a {color} ball

### Statically Typed Languages

When [Step Definitions](../docs/step-definitions.md) are written in a
statically typed programming language, Cucumber Expression
usage may be simplified in a couple of areas.

#### Implicit parameter types

There is no need to specify the parameter type in the Cucumber Expression as the
type can be inferred from the step definition body's signature. Here is an
example in Java:

```java
Given("I have {n} cukes in my belly", (int n) -> {
  // no need to specify {n:int} - the signature makes that explicit.
})
```

#### Implicit transforms

If a type used in a step definition has a constructor that accepts a single
`String` argument, then there is no need to register a custom transform for that type.

{% method %}
{% sample lang="java" %}
```java
[snippet](java/src/test/java/io/cucumber/cucumberexpressions/CustomTransformTest.java#add-color-transform)
```
{% sample lang="js" %}
```javascript
[snippet](javascript/test/custom_transform_test.js#add-color-transform)
```
{% sample lang="rb" %}
```ruby
[snippet](ruby/spec/cucumber/cucumber_expressions/custom_transform_spec.rb#add-color-transform)
```
{% endmethod %}

Registering an explicit transform is still beneficial, because it will allow Cucumber
to suggest snippets for undefined steps with the correct type.

## Step Definition Snippets

When Cucumber encounters a [Gherkin step](../docs/gherkin.md#steps) without a
matching [Step Definition](../docs/step-definitions.md), it will print a code
snippet with a matching step definition that you can use as a starting point.
Consider this Gherkin step:

    Given I have 3 red balls

Assuming you have registered the [color](#custom-type-transforms) transform above,
Cucumber would suggest a Step Definition with the following Cucumber Expression:

    I have {arg1:int} {arg2:color} balls

If you hadn't registered the `color` transform, Cucumber would have suggested
the following Cucumber Expression:

    I have {arg1:int} red balls

## Regular Expressions

Cucumber has a long relationship with Regular Expressions, and they can still be
used instead of instead of Cucumber Expressions if you prefer.

The Cucumber Expression library's Regular Expression support has automatic type
conversion just like Cucumber Expressions.

Imagine you have registered the (Color transform above)[#custom-type-transforms],
and have a step definition with the following Regular Expression:

    I have a (red|blue|yellow) ball

The following Gherkin step would automatically convert to a `Color` instance:

    I have a red ball

Built-in conversions for `int` and `float` also apply. The following
Regular Expression would automatically convert arguments to `int`:

    I have (\d+) cukes in my belly

## For contributors

If you're contributing to Cucumber, you might be interested in how to use
Cucumber Expressions programmatically. Here are some pointers:

### Capturing match arguments

When a Gherkin step is matched against an expression (`CucumberExpression` or `RegularExpression`), the result of the match is a list of `Argument`
(or `null`/`nil` if there was no match).

This API is similar to most regexp APIs, but the `Argument` type has additional
information:

* `value` - the string value of the parameter
* `transformedValue` - the value of the parameter, after type transformation
* `offset` - the position where the value was found

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
of code. This snippet will have a suggested Cucumber Expression, and possibly
a function signature with the appropriate type(s).

This information is in a `GeneratedExpression` object, which is generated by a
`CucumberExpressionGenerator`. The `CucumberExpressionGenerator` is aware of any
registered [transforms](#custom-type-transforms).

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

### Test Coverage

The `Cucumber Expressions` library has 100% test coverage for all implementations.

## Acknowledgements

The Cucumber Expression syntax is inspired by similar expression syntaxes in
other BDD tools, such as [Turnip](https://github.com/jnicklas/turnip), [Behat](https://github.com/Behat/Behat) and [Behave](https://github.com/behave/behave).

Big thanks to Jonas Nicklas, Konstantin Kudryashov and Jens Engel for
implementing those libraries.
