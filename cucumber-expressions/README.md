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
but we can also write a slightly more generic one, with an `int` *output parameter*:

    I have {int} cucumbers in my belly

When the text is matched against that expression, the number `42` is extracted
from the `{int}` output parameter.

(Cucumber passes the extracted values as arguments to your [Step Definitions](../docs/step-definitions.md)).

The following text would not match the expression:

    I have 42.5 cucumbers in my belly

This is because `42.5` does not look like an `int` (integers don't have a decimal part).
Let's change the output parameter to `float` instead:

    I have {float} cucumbers in my belly

Now the expression will match the text, and the float `42.5` is extracted.

## Parameter types

The text between the curly braces is the name of a *parameter type*. The built-in
parameter types are:

* `{int}`, for example `71` or `-19`
* `{float}`, for example `3.6`, `.8` or `-9.2`
* `{word}`, for example `banana` (but not `banana split`)
* `{string}`, for example `"bangers"` or `'mash'`. The single/double quotes themselves are removed from the match.

On the JVM, there are additional parameter types for `biginteger`, `bigdecimal`,
`byte`, `short`, `long` and `double`.

### Custom parameter types {#custom-parameter-types}

You can define custom parameter types to represent types from your own domain.
Doing this has the following benefits:

1. Automatic conversion to custom types
1. Document and evolve your ubiquitous domain language
1. Enforce certain patterns

Imagine we want a parameter to match the colors `red`, `blue` or `yellow`
(but nothing else). Let's assume a `Color` class is already defined.
This is how we would define a custom `color` parameter type:

{% method %}
{% sample lang="java" %}
```java
[snippet](java/src/test/java/io/cucumber/cucumberexpressions/CustomParameterTypeTest.java#add-color-parameter-type)
```
{% sample lang="js" %}
```javascript
[snippet](javascript/test/custom_parameter_type_test.js#add-color-parameter-type)
```

The `transformer` function can also return a `Promise`:
```javascript
[snippet](javascript/test/custom_parameter_type_test.js#add-async-parameter-type)
```

{% sample lang="rb" %}
```ruby
[snippet](ruby/spec/cucumber/cucumber_expressions/custom_parameter_type_spec.rb#add-color-parameter-type)
```
{% endmethod %}

The parameters are as follows:

* `name` - the name the parameter type will be recognised by in output parameters.
* `regexp` - a regexp that will match the parameter. May include capture groups.
* `type`
* `transformer` - a function that transforms the match from the regexp. Must have arity 1 if the regexp doesn't have
  any capture groups. Otherwise the arity must match the number of capture groups.
* `useForSnippets` (Ruby: `use_for_snippets`) - Defaults to `true`. That means this parameter type will be used to generate
  snippets for undefined steps. If the `regexp` frequently matches text you don't intend to be
  used as arguments, disable its use for snippets with `false`.
* `preferForRegexpMatch` (Ruby: `prefer_for_regexp_match`) - Defaults to `false`.
  Set to `true` if you use regular expressions and you want this parameter type's regexp
  take precedence over others during a match.

Now assume we have a Gherkin step with the following text following the step keyword:

    I have a red ball

This will now be matched by following Cucumber Expression:

    I have a {color} ball

Not only that, but the extracted argument will be of type `Color`.

The following text would not match the expression, because `green` isn't part
of the parameter definition.

    I have a green ball

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

## Escaping

If you ever need to match `()` or `{}` literally, you can escape the
opening `(` or `{` with a backslash:

    I have 42 \{what} cucumber(s) in my belly \(amazing!)

This expression would match the following examples:

    I have 42 {what} cucumber in my belly (amazing!)
    I have 42 {what} cucumbers in my belly (amazing!)

There is currently no way to escape the `/` character.

## Step Definition Snippets (Cucumber Expression generation)

When Cucumber encounters a [Gherkin step](../docs/gherkin.md#steps) without a
matching [Step Definition](../docs/step-definitions.md), it will print a step
Step Definition snippet with a matching Cucumber Expression that you can use as
a starting point.

Consider this Gherkin step:

    Given I have 3 red balls

If you had registered the [color](custom-parameter-types) parameter type above,
Cucumber would suggest a Step Definition with the following Cucumber Expression:

    I have {int} {color} balls

If you hadn't registered the `color` parameter type, Cucumber would have suggested
the following Cucumber Expression (only the built-in `int` parameter would be
recognised):

    I have {int} red balls

As you can see, Cucumber will generate better snippets for you if you define
your own parameter types, and you'll also end up with a more consistent domain
language in your Gherkin scenarios.

## Regular Expressions {#regular-expressions}

Cucumber has a long relationship with Regular Expressions, and they are still
fully supported, just better.

The Cucumber Expression library's Regular Expression support passes capture groups
through parameter types' transformers, just like Cucumber Expressions.

Imagine you have registered the [Color parameter above](#custom-parameter-types),
and have a step definition with the following Regular Expression:

    I have a (red|blue|yellow) ball

The following Gherkin step would automatically convert to a `Color` instance:

    I have a red ball

Built-in parameters for `int` and `float` also apply. The following
Regular Expression would automatically convert arguments to `int`:

    I have (\d+) cukes in my belly

### Preferential parameter types

In some cases you might want to define two or more parameter types with the same
regular expression, but different name and transformer. For example, you may want
to define `name` and `person` parameter types with the regexp `[A-Z]+\w+`, which
would match `Joe`, `Amy` and so on.

If you are using a [Regular Expressions](#regular-expressions) like the following

    ([A-Z]+\w+) has invited ([A-Z]+\w+)

And try to match that against the following text:

    Joe has invited Amy

Cucumber will not know whether to use the `name` or `person` parameter types,
because they both match.

In that case you can switch to using Cucumber Expressions, where parameters are
named, so there is no ambiguity:

    {person} has invited {name}

Alternatively, you can continue to use Regular Expressions if you prefer, and
make one of the parameter types *preferential* when you define it.
A preferential parameter type will always be chosen over a non-preferential one.

When several parameter types share the same regular expression, only one of the
parameter types can be preferential. If you define two parameter types with the
same regular expression that are both preferential you will get an error during
matching.

## For contributors

If you're contributing to Cucumber, you might be interested in how to use
Cucumber Expressions programmatically. Here are some pointers:

### Capturing match arguments

When a Gherkin step is matched against an expression
(`CucumberExpression` or `RegularExpression`), the result of the match is a list
of `Argument` (or `null`/`nil` if there was no match).

This API is similar to most regexp APIs, but the `Argument` type has additional
information:

* `value` - the transformed value of the match (transformed by the `transformer` function)
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
registered [parameters](#custom-parameter-types).

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
