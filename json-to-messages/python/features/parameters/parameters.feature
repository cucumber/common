Feature: step parameters

  Scenario Outline: simple scenario
    Given I have <count> cucumbers
    When I eat <eaten> cucumbers
    Then I have <left> cucumbers left

    Examples:
      | count | eaten | left |
      | 10    | 4     | 6    |
      | 10    | 6     | 4    |
      | 10    | 4     | 4    |

  Scenario: step parameters
    Given a step with a doctring:
      """
        This is some content
      """
    When a step with a datatable
      | name | value |
      | plic | 0     |
      | ploc | 1     |
    Given a step with a doctring:
      """
        This is some typed content
      """
