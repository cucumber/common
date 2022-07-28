Feature: Scenario Outline with values with trailing backslash

Scenario Outline: minimalistic
    Given <what>
    When <this>
    Then <that>

Examples:
  | what | this  | that   |
  | x\\y | this\ | that\\ |