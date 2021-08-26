import assert from 'assert'
import { StepSegments, lspCompletionSnippet } from '../src/index.js'

describe('lspSnippet', () => {
  it('converts a PermutationExpression to an LSP snippet', () => {
    const stepSegments: StepSegments = [
      'I have ',
      ['42', '54'],
      ' cukes in my ',
      ['basket', 'belly', 'table'],
    ]
    assert.strictEqual(
      lspCompletionSnippet(stepSegments),
      'I have ${1|42,54|} cukes in my ${2|basket,belly,table|}'
    )
  })
})
