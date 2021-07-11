# Cucumber Suggest

This library provides suggestions for Gherkin steps. It can be used to implement editor plugins.

All suggestions are based on existing Gherkin steps. 

Cucumber Expressions and Regular Expressions in Step Definitions are not suitable
for suggestions as they cannot be inserted directly into a text document as-is.

The library uses Cucumber Expressions and Regular Expressions to provide *better*
suggestions than what would have been possible using only Gherkin steps.

## Rule: Suggestions must have a matching step definition

It isn't enough to type something that matches an existing step,
the existing step must also have a matching step definition.

### Example: A single step is suggested

* Given the following Gherkin steps exist:
  | I have 42 cukes in my belly |
* And the following Step Definitions exist:
  | Something else |
* When I type "I have"
* Then the suggestions should be empty

## Rule: Only one suggestion per step definition

If there are multiple steps that match the same step definition,
then use the one with the lowest lexical order.

### Example: Two steps matching the same step definitiom

* Given the following Gherkin steps exist:
  | I have 23 cukes in my belly |
  | I have 11 cukes in my belly |
* And the following Step Definitions exist:
  | I have {int} cukes in my belly |
* When I type "I have"
* Then the suggestions should be:
  | I have 11 cukes in my belly |
