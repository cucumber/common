Feature: Simple
  some description
  here

  Background:
    Given a passed step

  Scenario: Number 1
    some other
    description here
    Given a passed step
    When a failed step
    Then a skipped step

  Scenario: Number 2
    Given a failed step

