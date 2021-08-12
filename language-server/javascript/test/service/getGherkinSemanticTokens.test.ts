import { getGherkinSemanticTokens } from '../../src/lsp'
import { SemanticTokens } from 'vscode-languageserver-types'
import assert from 'assert'

describe('getGherkinSemanticTokens', () => {
  it('creates tokens for keywords', () => {
    const gherkinSource = `# some comment
Feature: a
  This is a description
  and so is this

  Scenario: b
    Given c
`
    const semanticTokens = getGherkinSemanticTokens(gherkinSource)
    const expectedSemanticTokens: SemanticTokens = {
      data: [
        1, 0, 7, 0, 0,
        4, 2, 8, 0, 0,
        1, 4, 6, 0, 0
      ]
    }
    assert.deepStrictEqual(semanticTokens, expectedSemanticTokens)
  })
})
