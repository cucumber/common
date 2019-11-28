Feature: with hooks

  Background:
    Given a passed step

  @before-passed-hook @after-failed-hook
  Scenario: with a passed before hook and a failed after hook
    Given a passed step
