Feature: doc strings

  Scenario: a step can have docstrings
    Given a passed step with
      | name | value |
      | x    | 1     |
    Then a failed step with
      | name | value |
      | y    | 2     |