Feature: Sending TestRunFinished messages

    - Message is send before all BeforeTestRun hooks
    - Timestamp is in local time zone

    Scenario Outline: Finishing test suite sends a message (independent of feature file exist)

        Given there are '<NumberOfFeatureFiles>' feature files
        When the test suite is executed
        Then '<NumberOfTestRunFinishedMessages>' TestRunFinished messages have been sent

        Examples:
          | Case                              | NumberOfFeatureFiles | NumberOfTestRunFinishedMessages |
          | empty test suite                  | 0                    | 0                              |
          | test suite contains feature files | 1                    | 1                              |

    @SpecFlow
    Scenario: Parallel test runs can send multiple messages

        Given the test runner is 'SpecFlow+Runner'
        And there are '3' feature files
        And all steps are bound and pass
        When the test suite is executed with a testThreadCount of '3'
        Then '3' TestRunFinished messages have been sent

    Scenario: Test suite result is included in the message
        Given there are '2' feature files
        And all steps are bound and fail
        When the test suite is started at '2019-05-13 13:09:46'
        Then a TestRunStarted message has been sent with the following attributes
          | Attribute | Value               |
          | timestamp | 2019-05-13 13:09:46 |

