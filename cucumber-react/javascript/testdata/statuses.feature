Feature: Statuses
  This is a test file with a bunch of steps
  that will have different status thanks to fake-cucumber.

  Scenario: Pass-Fail-Skip
    Given a passed step
      | we | have  |
      | a  | table |
    When a step has failed
    Then the next one will be skipped

  Scenario: Pending-Ambiguous-Undefined
    Given a pending step
    When an ambiguous step isn't run
    Then following undefined steps are shown as such
