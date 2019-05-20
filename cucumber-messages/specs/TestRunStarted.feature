Feature: Sending TestRunStarted messages

  Scenario Outline: Starting test suite sends a message (independent of feature file exist)

    Given there are <NumberOfFeatureFiles> feature files
    When the test suite is executed
    Then a TestRunStarted message has been sent

    Examples:
      | Case                              | NumberOfFeatureFiles |
      | empty test suite                  | 0                    |
      | test suite contains feature files | 1                    |

  @SpecFlow
  Scenario: Parallel test runs can send multiple messages

    Given the test runner is 'SpecFlow+Runner'
    And there are '3' feature files
    When the test suite was executed with a testThreadCount of '3'
    Then '3' TestRunStarted messages have been sent
