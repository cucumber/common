Feature: Pending steps

  Scenario: Unimplemented step indicates it's pending
    Given a step
    When a step that isnt implemented yet
    Then a step
