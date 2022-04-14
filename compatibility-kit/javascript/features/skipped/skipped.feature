Feature: Skipping scenarios

  Hooks and step definitions are able to signal at runtime that the scenario should
  be skipped by returning or throwing a particular value.

  This can be useful when e.g. the current environment doesn't have the right conditions
  for running the scenario.

  @skip
  Scenario: Skipping from a Before hook
    Given a step that we expect to be skipped

  Scenario: Skipping from a step doesn't affect the previous steps
    Given an implemented step
    When a step that skips

  Scenario: Skipping from a step causes the rest of the scenario to be skipped
    Given a step that skips
    When a step that we expect to be skipped
