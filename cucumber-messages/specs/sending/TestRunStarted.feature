Feature: Sending TestRunStarted messages

Scenario: Correct timestamp in TestRunStarted message
  Given there is a feature file
  And the current time is '2019-05-13 13:09:46'
  When the test suite is executed
  Then a TestRunStarted message with timestamp '2019-05-13 13:09:46' has been sent
