Feature: Scenario Outline with values with trailing backslash

Scenario Outline: minimalistic
    When <what>
    Then <that>

Examples:
  | what  | that   |
  | what\ | that\\ |
