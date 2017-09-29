Feature: Linting Rules

  Gherkin-Lint processes specified Gherkin documents (`.feature` files)
  and validates them according to linting rules.

  Rules:
  * Results reported using [Event Protocol](https://docs.cucumber.io/event-protocol/) `attachment` events
  * Gherkin parse errors reported in the same way as rule violations (using `attachment`)
  * Rule violations must include rule name
  * Custom (user-land) rules can be loaded from a specified location

  Questions:
  * Do we include a link to the docs of violated rules?
  * What about weight/severity?
  * What mechanisms should we offer to enable/disable rules?

  Scenario: Syntax error in Gherkin document
    Given a Gherkin document at features/hello.feature with contents:
      """gherkin
      #language:no-such
      Feature: Meh
      """

    When the document is linted
    Then the following warning should emitted:
      | location | features/hello.feature:1               |
      | message  | (1:1): Language not supported: no-such |

  Scenario: Valid Gherkin document
    Given a Gherkin document at features/hello.feature with contents:
      """gherkin
      Feature: Meh
      """
    When the document is linted
    Then no warnings should be emitted
