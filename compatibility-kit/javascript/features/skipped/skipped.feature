Feature: Skipping scenarios

  @skip
  Scenario: Skipping from a Before hook
    Given a step

  Scenario: Skipping from a step
    Given a step
    When a step that skips
    Then a step
