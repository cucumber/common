# Gherkin

Gherkin is the language that Cucumber understands. It is a Business Readable, [Domain Specific Language](http://martinfowler.com/bliki/BusinessReadableDSL.html) that lets you describe software’s behaviour without detailing how that behaviour is implemented.

Gherkin serves two purposes — documentation and automated tests. The third is a bonus feature — when it yells in red it’s talking to you, telling you what code you should write.

Gherkin’s grammar is defined in the Treetop grammar that is part of the Cucumber codebase. The grammar exists in different flavours for many spoken languages (37 at the time of writing), so that your team can use the keywords in your own language.

There are a few conventions.

 * Single Gherkin source file contains a description of a single feature.
 * Source files have `.feature` extension.

## Gherkin Syntax

Like Python and YAML, Gherkin is a line-oriented language that uses indentation to define structure. Line endings terminate statements (eg, steps). Either spaces or tabs may be used for indentation (but spaces are more portable). Most lines start with a keyword.

Comment lines are allowed anywhere in the file. They begin with zero or more spaces, followed by a hash sign (`#`) and some amount of text.

The parser divides the input into features, scenarios and steps. When you run the feature the trailing portion (after the keyword) of each step is matched to a Ruby code block called [Step Definitions](docs/step-definitions.md).

A Gherkin source file usually looks like this
```
1: Feature: Some terse yet descriptive text of what is desired
 2:   Textual description of the business value of this feature
 3:   Business rules that govern the scope of the feature
 4:   Any additional information that will make the feature easier to understand
 5:
 6:   Scenario: Some determinable business situation
 7:     Given some precondition
 8:       And some other precondition
 9:     When some action by the actor
10:       And some other action
11:       And yet another action
12:     Then some testable outcome is achieved
13:       And something else we can check happens too
14:
15:   Scenario: A different situation
16:       ...
```

First line starts the feature. Lines 2–4 are unparsed text, which is expected to describe the business value of this feature. Line 6 starts a scenario. Lines 7–13 are the steps for the scenario. Line 15 starts next scenario and so on.

Read more

 * [Feature Introduction](docs/gherkin.md#feature) – general structure of a feature
 * [Given/When/Then (Steps)](docs/gherkin.md#steps)

## Feature Introduction {#feature}

Every `.feature` file conventionally consists of a single feature. A line starting with the keyword Feature followed by free indented text starts a feature. A feature usually contains a list of scenarios. You can write whatever you want up until the first scenario, which starts with the word Scenario (or localized equivalent; Gherkin is localized for [dozens of languages](https://github.com/cucumber/cucumber/wiki/Spoken-languages)) on a new line. You can use tagging to group features and scenarios together independent of your file and directory structure.

Every scenario consists of a list of steps, which must start with one of the keywords **Given, When, Then, But** or **And**. Cucumber treats them all the same, but you shouldn’t. Here is an example:

```
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

In addition to a scenario, a feature may contain a background, scenario outline and examples. Respective keywords (in English) and places to read more about them are listed below. You can get a list of localized keywords with cucumber `--i18n [LANG]`.

|     keyword     |     localized           | more info see     |
|-----------------|-------------------------|-------------------|
| name            | 'English'               |                   |
| native          | 'English'               |                   |
| encoding        | 'UTF-8'                 |                   |
| feature         | 'Feature'               | [Feature](gherkin.md#feature)
| background      | 'Backgroound'           | [Background](gherkin.md#background)
| scenario        | 'Scenario'              | [Scenario](gherkin.md#feature)
| scenario_outline| 'Scenario Outline'      | [Scenario Outline](gherkin.md#background)
| examples        | 'Examples'/ 'Scenarios' | [Scenario Outline](docs/gherkin.md#background)
| given           | 'Given'                 | [Given/When/Then (Steps)](docs/gherkin.md#steps)
| when            | 'When'                  | [Given/When/Then (Steps)](docs/gherkin.md#steps)
| then            | 'Then'                  | [Given/When/Then (Steps)](docs/gherkin.md#steps)
| and             | 'And'                   | [Given/When/Then (Steps)](docs/gherkin.md#steps)
| but             | 'But'                   | [Given/When/Then (Steps)](docs/gherkin.md#steps)

## Step definitions {#steps}

For each step Cucumber will look for a matching **step definition**. A step definition is written in Ruby. Each step definition consists of a keyword, a string or regular expression, and a block. Example:

```
# features/step_definitions/coffee_steps.rb

Then "I should be served coffee" do
  @machine.dispensed_drink.should == "coffee"
end
```

Step definitions can also take parameters if you use regular expressions:

```
# features/step_definitions/coffee_steps.rb

Given /there are (\d+) coffees left in the machine/ do |n|
  @machine = Machine.new(n.to_i)
end
```

This step definition uses a regular expression with one match group – `(\d+)`. (It matches any sequence of digits). Therefore, it matches the first line of the scenario. The value of each matched group gets yielded to the block as a string. You must take care to have the same number of regular expression groups and block arguments. Since block arguments are always strings, you have to do any type conversions inside the block, or use Step Argument Transforms.

When Cucumber prints the results of the running features it will underline all step arguments so that it’s easier to see what part of a step was actually recognised as an argument. It will also print the path and line of the matching step definition. This makes it easy to go from a feature file to any step definition.

Take a look at [Step Definitions](docs/step-definitions.md) and the examples directory to see more.

## Background {#background}

A background section in a feature file allows you to specify a set of steps that are common to every scenario in the file. Instead of having to repeat those steps over and over for each scenario, you move them up into a Background element. There are a couple of advantages to doing this:

A Background is much like a scenario containing a number of steps. The difference is when it is run. The background is run before each of your scenarios but after any of your Before [Hooks](hooks.md).

Example:

```
Feature: Change PIN
  #some feature description comes here

  Background:
    Given I have been issued a new card
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

### Good practices for using Background

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

