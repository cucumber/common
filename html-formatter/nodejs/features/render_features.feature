Feature: Render Feature

  Rules:
  * Standalone app
  * Consumes stream of events on listening socket
  * Opens new browser when a new connection is made

  Scenario: Render one Feature
    When a new feature at features/hello.feature is streamed:
      ```gherkin
      Feature: Hello
        Scenario: World
          Given hello
      ```
    When the stream is closed
    Then the feature should be reported
