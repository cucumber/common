# Gherkin

Gherkin is the language that Cucumber understands. It is a Business Readable, [Domain Specific Language](http://martinfowler.com/bliki/BusinessReadableDSL.html) that lets you describe software’s behaviour without detailing how that behaviour is implemented.

Gherkin serves two purposes — documentation and automated tests. The third is a bonus feature — when it yells in red it’s talking to you, telling you what code you should write.

Gherkin’s grammar exists in different flavours for many spoken languages (37 at the time of writing), so that your team can use the keywords in your own language.

There are a few conventions.

 * Single Gherkin source file contains a description of a single feature.
 * Source files have `.feature` extension.

## Gherkin Syntax

A Gherkin source file usually looks like this
```gherkin
Feature: Some terse yet descriptive text of what is desired
  Textual description of the business value of this feature
  Business rules that govern the scope of the feature
  Any additional information that will make the feature easier to understand

  Scenario: Some determinable business situation
    Given some precondition
    When some action by the actor
    Then some testable outcome is achieved

  Scenario: A different situation
    ...
```
You can probably see that Cucumber expects a little bit of structure in this file. The keywords `Feature`, `Scenario`, `Given`, `When`, and `Then` are the structure, and everything else is documentation.

Read more

 * [Feature Introduction](#feature) – general structure of a feature
 * [Given/When/Then (Steps)](#steps)

## Feature Introduction {#feature}

Each Gherkin file begins with the `Feature` keyword.
A Cucumber feature is a grouping of related scenarios, describing the same software feature. Every `.feature` file conventionally consists of a single feature.

The text immediately following on the same line as the `Feature` keyword is the name of the feature, and the remaining lines are its description.
You can include any text you like in the description except a line beginning with one of the words `Scenario`, `Background`, or `Scenario Outline`.

A feature usually contains a list of scenarios.
You can write whatever you want up until the first scenario, which starts with the word `Scenario` (or localized equivalent; Gherkin is localized for [dozens of languages](https://github.com/cucumber/cucumber/wiki/Spoken-languages)) on a new line.

You can use tagging to group features and scenarios together independent of your file and directory structure.

Every scenario consists of a list of steps, which must start with one of the keywords **Given**, **When**, **Then**, **But** or **And**. Cucumber treats them all the same, but you shouldn’t.

* Given describes the current state of the world. It can also describe something that has happened in the past.
* When is an event, or an action that is expected to cause an observable change.
* Then is an expected and observable outcome, or result.

Here is an example:

```gherkin
Feature: Serve coffee
  Coffee should not be served until paid for
  Coffee should not be served until the button has been pressed
  If there is no coffee left then money should be refunded

  Scenario: Buy last coffee
    Given there are 1 coffees left in the machine
    And I have deposited 1$
    When I press the coffee button
    Then I should be served a coffee
```

In addition to a scenario, a feature may contain a [Background](#background), [Scenario Outline](#background) and [Examples](#background).
Respective keywords (in English) and places to read more about them are listed below.
You can get a list of localized keywords with `cucumber --i18n [LANG]`.

* [Feature](#feature)
* [Background](#background)
* [Scenario](#feature)
* [Scenario Outline](#background)
* [Examples](#background)
* [Given/When/Then (Steps)](step_definitions.md#steps)

## Background {#background}

A background section in a feature file allows you to specify a set of steps that are common to every scenario in the file. Instead of having to repeat those steps over and over for each scenario, you move them up into a Background element. There are a couple of advantages to doing this:

A Background is much like a scenario containing a number of steps. The difference is when it is run. The background is run before each of your scenarios but after any of your `Before` [Hooks](hooks.md).

Example:

```
Feature: Change PIN
  #some feature description comes here

  Background:
    Given I was issued a new card
    And I insert the card, entering the correct PIN
    And I choose "Change PIN" from the menu

  Scenario: Change PIN successfully
    When I change the PIN to 9876
    Then the system should remember my PIN is now 9876

  Scenario: Try to change PIN to the same as before
    When I try to change the PIN to the original PIN number
    Then I should see a warning message
    And the system should not have changed my PIN
```

You can have a single `Background` element per feature file, and it must appear before any of the `Scenario` or `Scenario Outline` elements. Just like all the other _Gherkin_ elements, you can give it a name, and you have space to put a multiline description before the first step. For example:

```
Feature: Change PIN
  In order to be able to change it to something they can easily
  remember, customers with new bank cards need to be able to
  change their PIN using the ATM.

  Background: Insert a newly issued card and sign in
    Whenever the bank issues new cards to customers, they are supplied
    with a Personal Identification Number (PIN) that is randomly
    generated by the system.

    Given I have been issued a new card
    And I insert the card, entering the correct PIN
    ...
```

### Good practices

  * Don’t use `Background` to set up complicated state unless that state is actually something the client needs to know.
  * Keep your `Background` section short.
  * Make your `Background` section vivid.
  * Keep your scenarios short and don’t have too many.

## Doc Strings {#doc-strings}

Doc strings just allow you to specify a larger piece of text than you could fit on a single line. For example, if you need to describe the precise content of an email message, you could do it like this:

```
Scenario: Ban Unscrupulous Users
  When I behave unscrupulously
  Then I should receive an email containing:
    """
    Dear Sir,
    Your account privileges have been revoked due to your unscrupulous behavior.
    Sincerely,
    The Management
    """
  And my account should be locked
```

Just like a [Data Tables](docs/gherkin.md#datatable), the entire string between the `"""` triple quotes is attached to the step above it. The indentation of the opening `"""` is not important, although common practice is to indent two spaces in from the enclosing step, as shown.

The indentation inside the triple quotes, however, is significant: imagine the left margin running down from the start of the first """. If you want to include indentation within your string, you need to indent it within this margin.

## Comments {#comments}

As well as the description fields that follow Feature and Scenario keywords, Cucumber allows you to precede these keywords with comments.
Like in Ruby, comments start with a `#` character. Unlike in Ruby, comments have to be the first and the only thing on a line (well, apart from whitespace).

Here’s an example:
```
# This feature covers the account transaction and hardware-driver modules
Feature: Withdraw Cash
  In order to buy beer
  As an account holder
  I want to withdraw cash from the ATM

  # Can't figure out how to integrate with magic wand interface
  Scenario: Withdraw too much from an account in credit
  ...
```
