Feature: with hooks

  @before-passed
  Scenario: with a passed before hook
    Given a passed step

  @after-failed
  Scenario: With a failed after hook
    Given a passed step

  @before-passed @after-failed
  Scenario: With a passed before hook and a failed after hook
    Given a passed step
