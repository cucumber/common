import assert from 'assert'
import lspCompletionSnippet from '../src/lspCompletionSnippet'
import { StepDocument } from '../src/types'

describe('lspSnippet', () => {
  it('converts a PermutationExpression to an LSP snippet', () => {
    const expression: StepDocument = ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly', 'table']]
    assert.strictEqual(lspCompletionSnippet(expression), 'I have ${1|42,54|} cukes in my ${2|basket,belly,table|}')
  })
})
