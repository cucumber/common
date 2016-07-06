#Gherkin

## Scenario Outline {#scenario-outline}
Copying and pasting scenarios to use different values quickly becomes tedious and repetitive:

```gherkin
Scenario: eat 5 out of 12
  Given there are 12 cucumbers
  When I eat 5 cucumbers
  Then I should have 7 cucumbers

Scenario: eat 5 out of 20
  Given there are 20 cucumbers
  When I eat 5 cucumbers
  Then I should have 15 cucumbers
```

Scenario outlines allow us to more concisely express these examples through the use of a template with placeholders, using `Scenario Outline`, `Examples` with tables and `< >` delimited parameters:

```gherkin
Scenario Outline: eating
  Given there are <start> cucumbers
  When I eat <eat> cucumbers
  Then I should have <left> cucumbers

  Examples:
    | start | eat | left |
    |  12   |  5  |  7   |
    |  20   |  5  |  15  |
```

The Scenario Outline steps provide a template which is never directly run. A Scenario Outline is run once for each row in the `Examples` section beneath it (not counting the first row).

The way this works is via placeholders. Placeholders must be contained within `< >` in the Scenario Outline's steps. For example:

```gherkin
Given <I'm a placeholder and I'm ok>
```

The placeholders indicate that when the Examples row is run they should be substituted with real values from the `Examples` table. If a placeholder name is the same as a column title in the `Examples` table then this is the value that will replace it.

You can also use placeholders in [Multiline Step Arguments](docs/gherkin.md#doc-strings).

**IMPORTANT:** *Your step definitions will never have to match a placeholder. They will need to match the values that will replace the placeholder*

So when running the first row of our example:

```gherkin
Examples:
  | start | eat | left |
  |  12   |  5  |  7   |
```

The scenario that is actually run is:

```gherkin
Scenario Outline: eating
  Given there are 12 cucumbers      # <start> replaced with 12
  When I eat 5 cucumbers            # <eat> replaced with 5
  Then I should have 7 cucumbers    # <left> replaced with 7
```

While `scenario outlines` help minimize redundancy, they aren't necessarily easier to read from a business or narrative perspective. Remember to choose `examples` that illustrate something new about the `feature`.

One way to make sure that your `examples` are contributing to the full picture of the `feature` is to break them into multiple tables. Whenever possible, include plain-text descriptions of the underlying rules and break the examples up to illustrate these rules.

Here is an example from [The Cucumber Book](https://pragprog.com/book/hwcuc/the-cucumber-book) (p.74):

```gherkin
Feature: Account Creation
Scenario Outline: Password validation
  Given I try to create an account with password "<Password>"
  Then I should see that the password is <Valid or Invalid>

  Examples:
  | Password | Valid or Invalid |
  | abc      | invalid          |
  | ab1      | invalid          |
  | abc1     | valid            |
  | abcd     | invalid          |
  | abcd1    | valid            |
```
In that feature, it isn't clear why certain passwords are valid or invalid. By reformatting the examples into two tables with descriptive text, the scenario outline becomes much more effective (p.75):

```gherkin
Feature: Account Creation
Scenario Outline: Password validation
  Given I try to create an account with password "<Password>"
  Then I should see that the password is <Valid or Invalid>

  Examples: Too Short
    Passwords are invalid if less than 4 characters

    | Password | Valid or Invalid |
    | abc      | invalid          |
    | ab1      | invalid          |

  Examples: Letters and Numbers
    Passwords need both letters and numbers to be valid

    | abc1     | valid            |
    | abcd     | invalid          |
    | abcd1    | valid            |
```
