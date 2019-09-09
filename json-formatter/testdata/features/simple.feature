Feature: Simple
  some description
  here

  Background:
    Given a passed step

  Scenario: number 1
    some other
    description here
    Given a passed step
    When a failed step
    Then a skipped step

  Scenario: number 2
    Given a failed step

  Scenario Outline: With multiple statuses
    Given a passed step
    When a <status1> step
    Then a <status2> step

    Examples:
      | status1   | status2   |
      | passed    | passed    |
      | failed    | skipped   |
      | ambiguous | undefined |
  