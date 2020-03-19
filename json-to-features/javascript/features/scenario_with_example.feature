Feature: examples

  Scenario Outline: statuses
    When a <first> step
    Then a <second> step

    Examples:
      | first | second   |
      | passed | passed  |
      | failed | skipped |
