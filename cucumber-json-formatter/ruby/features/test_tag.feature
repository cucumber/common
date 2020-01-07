@tagged-feature
Feature: With tags

  @acceptance
  Scenario: With a single tag
    Given a passed step

  @acceptance @wip
  Scenario: With multiple tags
    Given a passed step
    Then a failed step

