import { getGherkinSemanticTokens } from '../src'
import { SemanticTokens } from 'vscode-languageserver-types'
import assert from 'assert'
import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'

describe('getGherkinSemanticTokens', () => {
  it('creates tokens for keywords', () => {
    const gherkinSource = `# some comment
@foo @bar
Feature: a
  This is a description
  and so is this

  Scenario: b
    Given I have 42 cukes in my belly
      """sometype
     hello
        world
       """
    And a table
      | a  | bbb |
      | cc |  dd |

  Scenario Outline: c
    Given a <foo> and <bar>

    Examples:
      | foo | bar |
      | a   | b   |
`
    const expression = new CucumberExpression(
      'I have {int} cukes in my {word}',
      new ParameterTypeRegistry()
    )

    const semanticTokens = getGherkinSemanticTokens(gherkinSource, [expression])
    const expectedSemanticTokens: SemanticTokens = {
      // See https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens
      // for details about how tokens are encoded
      data: [
        1,
        0,
        4,
        4,
        0, // @foo
        0,
        5,
        4,
        4,
        0, // @bar
        1,
        0,
        7,
        0,
        0, // Feature
        4,
        2,
        8,
        0,
        0, // Scenario
        1,
        4,
        6,
        0,
        0, // Given
        0,
        13,
        2,
        1,
        0, // 42
        0,
        15,
        5,
        1,
        0, // belly
        1,
        6,
        3,
        2,
        0, // """
        0,
        3,
        8,
        3,
        0, // sometype
        1,
        5,
        5,
        2,
        0, // hello
        1,
        8,
        5,
        2,
        0, // world
        1,
        7,
        3,
        2,
        0, // """
        1,
        4,
        4,
        0,
        0, // And
        1,
        8,
        1,
        1,
        0, // a
        0,
        5,
        3,
        1,
        0, // bbb
        1,
        8,
        2,
        1,
        0, // cc
        0,
        6,
        2,
        1,
        0, // dd
        2,
        2,
        16,
        0,
        0, // Scenario Outline
        1,
        4,
        6,
        0,
        0, // Given
        0,
        8,
        5,
        5,
        0, // <foo>
        0,
        10,
        5,
        5,
        0, // <bar>
        2,
        4,
        8,
        0,
        0, // Examples
        1,
        8,
        3,
        6,
        0, // foo
        0,
        6,
        3,
        6,
        0, // bar
        1,
        8,
        1,
        1,
        0, // a
        0,
        6,
        1,
        1,
        0, // b
      ],
    }
    assert.deepStrictEqual(semanticTokens, expectedSemanticTokens)
  })
})
