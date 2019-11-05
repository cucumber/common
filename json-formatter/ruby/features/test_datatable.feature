Feature: doc strings

  Scenario: a step can have docstrings
    When a passed step
      | name | value |
      | x    | 1     |
    Then a failing step
      | name | value |
      | y    | 2     |