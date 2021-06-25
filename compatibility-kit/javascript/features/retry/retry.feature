Feature: Retry

  Some Cucumber implementations support a Retry mechanism, where test cases that fail
  can be retried up to a limited number of attempts in the same test run.

  Non-passing statuses other than FAILED don't trigger a retry - they are not going to pass
  however many times we attempt them.

  Scenario: test case passes on the first attempt
    Given a step that always passes

  Scenario: test case passes on the second attempt
    Given a step that passes the second time

  Scenario: test case passes on the final attempt
    Given a step that passes the third time

  Scenario: test case fails on every attempt
    Given a step that always fails

  Scenario: don't retry on UNDEFINED
    Given a non-existent step
