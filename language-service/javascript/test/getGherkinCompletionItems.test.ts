import { CompletionItem, CompletionItemKind, InsertTextFormat } from 'vscode-languageserver-types'
import assert from 'assert'
import { StepDocument, bruteForceIndex } from '@cucumber/suggest'
import { getGherkinCompletionItems } from '../src'

const doc1: StepDocument = {
  suggestion: 'I have {int} cukes in my belly',
  segments: ['I have ', ['42', '98'], ' cukes in my belly'],
}
const doc2: StepDocument = {
  suggestion: 'I am a teapot',
  segments: ['I am a teapot'],
}
const index = bruteForceIndex([doc1, doc2])

describe('getGherkinCompletionItems', () => {
  it('completes with step text', () => {
    const gherkinSource = `Feature: Hello
  Scenario: World
    Given cukes
`
    const completions = getGherkinCompletionItems(gherkinSource, 2, index)
    const expectedCompletions: CompletionItem[] = [
      {
        label: 'I have {int} cukes in my belly',
        insertText: 'I have ${1|42,98|} cukes in my belly',
        insertTextFormat: InsertTextFormat.Snippet,
        kind: CompletionItemKind.Text,
      },
    ]
    assert.deepStrictEqual(completions, expectedCompletions)
  })
})
