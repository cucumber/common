Feature: doc strings

  Scenario: a step can have docstrings
    Given a passed step with
      """
      This is a doc string
      """
    Then a failed step with
      """
      Can also have doc strings
      """