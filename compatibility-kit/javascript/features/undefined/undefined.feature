Feature: Undefined steps

  At runtime, Cucumber may encounter a step in a scenario that it cannot match to a
  step definition. In these cases, the scenario cannot run and so the step status
  will be UNDEFINED, with subsequent steps being skipped and the overall result treated
  as a failure.

  Scenario: Undefined step causes failure
    Given a step that isnt implemented yet

  Scenario: Steps before undefined steps are executed
    Given an implemented step
    When a step that isnt implemented yet

  Scenario: Steps after undefined steps are skipped
    Given a step that isnt implemented yet
    Then a step that we expect to be skipped
