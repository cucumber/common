Feature: Examples

  Scenario Outline: With multiple statuses
    Given a passed step
    When a <status1> step
    Then a <status2> step

    Examples: some examples
      Some examples description

      | status1 | status2   |
      | passed  | passed    |
      | passed  | undefined |


    Examples: some more examples
      Bla bla

      | status1 | status2 |
      | failed  | skipped |

  Scenario Outline: Using example in name: <exampleName>
    Given a <status> step

    Examples:
      | exampleName | status |
      | passed step | passed |
