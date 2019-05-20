Feature: Sending TestRunStarted messages

Scenario: TestRunStarted message is sent when a feature file exists
  Given there is a feature file
  When the test suite is executed
  Then a TestRunStarted message has been sent

Scenario: TestRunStarted message is sent when no feature file exists
  Given there is no feature file
  When the test suite is executed
  Then a TestRunStarted message has been sent
