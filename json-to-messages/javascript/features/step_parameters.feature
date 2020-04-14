Feature: step parameters

  Scenario: a simple scenario
    Given a step with a docstring
      """
      This is some input
      spread on multiple lines
      """
    When a step with a datatable
      | username | password |
      | admin    | @dmin    |
      | user     | s3cr3t   |
    Then a step with a typed docstring
      ```ruby
      put "Hello world !!"
      ```
