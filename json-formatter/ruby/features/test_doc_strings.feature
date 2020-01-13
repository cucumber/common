Feature: Doc strings

  Scenario: A step can have doc strings
    Given a passed step with
      """
      This is a doc string
      """
    Then a failed step with
      """
      Can also have doc strings
      """