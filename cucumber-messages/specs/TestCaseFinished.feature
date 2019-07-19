Feature: Sending TestCaseFinished Messages

    Scenario Outline: Ending test cases sends a message per test case

        Given there are <NumberOfScenarios> scenarios
        And all steps are bound and pass

        When the test suite is executed

        Then <NumberOfTestCaseFinishedMessages> TestCaseFinished messages have been sent

        Examples:
            | Case             | NumberOfScenarios | NumberOfTestCaseFinishedMessages |
            | empty test suite | 0                 | 0                                |
            | Single scenario  | 1                 | 1                                |
            | Two scenarios    | 2                 | 2                                |

    Scenario: Test case end time and PickleId is included in the message

        Given there is a scenario with PickleId 'ff981b6f-b11e-4149-baa1-9794940ac8bf'
        And all steps are bound and pass

        When the scenario is finished at '2019-05-13 13:09:46'

        Then a TestCaseFinished message has been sent with the following attributes
            | Attribute | Value                                |
            | timestamp | '2019-05-13 13:09:46'                |
            | pickleId  | ff981b6f-b11e-4149-baa1-9794940ac8bf |

    Scenario Outline: TestCase Result depends on binding and execution result

        Given there is a scenario with the following steps: 'Step1'
        And with step definitions in the following order: '<bindings and step result>'

        When the test suite is executed

        Then a TestCaseFinished message has been sent with the following TestResult
            | Attribute | Value             |
            | status    | <Scenario Status> |

        Examples:
            | Description                                  | bindings and step result                 | Scenario Status |
            | one passing step definition                  | Step1Binding (pass)                      | Passed          |
            | one failing step definition                  | Step1Binding (fail)                      | Failed          |
            | one pending step definition                  | Step1Binding (pending)                   | Pending         |
            | no step definition                           |                                          | Undefined       |
            | two step definitions with identical bindings | Step1Binding (pass), Step1Binding (pass) | Ambiguous       |

    Scenario Outline: TestCaseFinished message with status Skipped is send, if the scenario is ignored

        Given there is an ignored scenario with the following steps: 'Step1'
        And with step definitions in the following order: '<bindings and step result>'

        When the test suite is executed
        
        Then a TestCaseFinished message has been sent with the following TestResult
            | Attribute | Value             |
            | status    | Skipped           |

        Examples:
            | Description                                  | bindings and step result                 |
            | one passing step definition                  | Step1Binding (pass)                      |
            | one failing step definition                  | Step1Binding (fail)                      |
            | one pending step definition                  | Step1Binding (pending)                   |
            | no step definition                           |                                          |
            | two step definitions with identical bindings | Step1Binding (pass), Step1Binding (pass) |