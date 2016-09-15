Feature: implementation-detail

  Implementation details should not surface in Cucumber scenarios

  Scenario: button
    Given a Gherkin document at features/implementation-detail.feature with contents:
      ```gherkin
      Feature: Implementation Detail
        Scenario: button
          Given I am on the home screen
          When I press the big button
          Then I should get candy
      ```
    And the implementation-detail rule is enabled
    When the document is linted
    Then the following event should be emitted:
      ```json
      {
        "type": "error",
        "source": {
          "uri": "features/implementation-detail.feature",
          "start": {
            "line": 4,
            "column": 26
          }
        },
        "message": "(4:25): Implementation detail: button"
      }
      ```
