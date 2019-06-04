Feature: Sending TestRunStarted messages

  Scenario: Test suite starting time is included in the message

    When the test suite is started at '2019-05-13 13:09:46'
    And the test suite was executed
    Then a TestRunStarted message has been sent with the following attributes
      | Attribute | Value               |
      | timestamp | 2019-05-13 13:09:46 |

  Scenario Outline: Cucumber implementation is included in message

    Given the cucumber implementation is <implementation>
    When the test suite is executed
    Then a TestRunStarted message has been sent with the following attributes
      | Attribute              | Value              |
      | cucumberImplementation | <ImplementationId> |

    @SpecFlow
    Examples:
      | implementation | ImplementationId |
      | SpecFlow       | SpecFlow         |
