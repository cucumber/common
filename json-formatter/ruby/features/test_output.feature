Feature: output text in JSON

Scenario: steps can output text
  Given a step outputs:
    """
    This text will be displayed in the output
    And can have multiple lines
    """