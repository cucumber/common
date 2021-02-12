# Feature: Step Definitions

Your Gherkin steps are connected to the system through *Step Definitions*.

## Rule: A step definition can be invoked with parameter values

A Step Definition is made up by an expression and a body.
The expression is either a Regular Expression or a Cucumber Expression.
The body is a function, method, lambda, block or closure, depending on
your programming language.

### Example: string and int

* Given the following step definition:
  ```typescript
  Given("there are {int} apples in {string}'s basket", function(apples: number, name: string) {
    console.log(JSON.stringify([number, name]))
  })
  ```
* And the following Gherkin step:
  ```gherkin
  Given there are 4 apples in Mary's basket
  ```
* When the step runs
* Then the following should be printed:
  ```
  [24, "Mary"]
  ```

## Rule: A step definition can be passes multiline arguments

### Example: DataTable

Here is an example of what it looks like:

* Given this is a typical table:

| name | age |
| ---- | --: |
| Bill |   3 |
| Jane |   6 |
