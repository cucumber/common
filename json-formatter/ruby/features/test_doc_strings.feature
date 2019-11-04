Feature: doc strings

  Scenario: a step can have docstrings
    When a passed step
      """
      This is a doc string
      """
    Then a failing step
      """
      Can also have doc strings
      """