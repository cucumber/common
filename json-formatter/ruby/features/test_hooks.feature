Feature: with hooks

  Background:
    Given a passed step

  @before-passed @after-failed
  Scenario: with a passed before hook and a failed after hook
    Given a passed step
