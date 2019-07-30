# A
Feature: A
  The feature
  description

# B
Background: B
  The background
  description

  Given b
    | text | number |
    | a    |     10 |
    | bb   |    100 |
    | ccc  |   1000 |

# C
Scenario: C
  Given c
    """
    x
     y
      z
    """
  And <c1>
  Then <c2>

  # CE
  @ce
  Examples: CE
    | c1  |   c2 |
    | a   |   10 |
    | bb  |  100 |
    | ccc | 1000 |

# D
Rule: D

  # E
  Background: E
    Given e

  # F
  @f @F
  Scenario: F
    Given f
