import { getGherkinSemanticTokens } from '../../src/lsp'
import { SemanticTokens } from 'vscode-languageserver-types'
import assert from 'assert'
import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'

describe('getGherkinSemanticTokens', () => {
  it('creates tokens for keywords', () => {
    const gherkinSource = `# some comment
Feature: a
  This is a description
  and so is this

  Scenario: b
    Given I have 42 cukes in my belly
`
    const expression = new CucumberExpression('I have {int} cukes in my {word}', new ParameterTypeRegistry())

    const semanticTokens = getGherkinSemanticTokens(gherkinSource, [expression])
    const expectedSemanticTokens: SemanticTokens = {
      // See https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens
      // for details about how tokens are encoded
      data: [
        1, 0, 7, 0, 0,
        4, 2, 8, 0, 0,
        1, 4, 6, 0, 0,
        0, 13, 2, 1, 0,
        0, 15, 5, 1, 0
      ]
    }
    assert.deepStrictEqual(semanticTokens, expectedSemanticTokens)
  })
})
