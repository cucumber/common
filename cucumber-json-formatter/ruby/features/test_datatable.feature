Feature: Data tables

  Scenario: A step can have data tables
    Given a passed step with
      | name | value |
      | x    | 1     |
    Then a failed step with
      | name | value |
      | y    | 2     |