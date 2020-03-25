Feature: step parameters

  Scenario: simple scenario
    Given I have <count> cucumbers
    When I eat <eaten> cucumbers
    Then I have <left> cucumbers left

    Examples:
      | count | eaten | left |
      | 10    | 4     | 6    |
      | 10    | 6     | 4    |
      | 10    | 4     | 4    |