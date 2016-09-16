Feature: implementation-detail

  Implementation details should not surface in Cucumber scenarios

  Scenario: button
    Given a Gherkin document at features/implementation-detail.feature with contents:
      """gherkin
      Feature: Implementation Detail
        Scenario: button
          Given I am on the home screen
          When I press the big button
          Then I should get candy
      """
    And the implementation-detail rule is enabled
    When the document is linted
    Then the following warning should emitted:
      | location | features/implementation-detail.feature:4:26 |
      | message  | Implementation detail: button               |
