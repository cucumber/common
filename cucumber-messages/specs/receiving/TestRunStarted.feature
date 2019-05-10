Feature: Receiving TestRunStarted messages

Scenario: Handling a message queue with no TestRunStarted message
  Given there is no TestRunStarted message in the message queue
  When the messsage queue is processed
  Then there is an error
  And the queue processing is stopped

Scenario: Handling a message queue with a single TestRunStarted message
  Given there is a TestRunStarted message in the message queue
  When the message queue is processed
  Then the start of the test run was recognized

Scenario: Handling a message queue with two TestRunStarted messages
  Given there are two TestRunStarted messages in the message queue
  When the message queue is processed
  Then the start of the test run was recognized
  And the second TestRunStarted message has been ignored
