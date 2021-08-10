import {
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
  TextDocumentPositionParams,
  TextDocuments
} from 'vscode-languageserver/node'
import Completer from '../../src/lsp/Completer'
import { TextDocument } from 'vscode-languageserver-textdocument'
import assert from 'assert'
import bruteForceIndex from '../bruteForceIndex'
import { StepDocument } from '../../src/types'

const doc1: StepDocument = {
  suggestion: 'I have {int} cukes in my belly',
  segments: ['I have ', ['42', '98'], ' cukes in my belly'],
}
const doc2: StepDocument = {
  suggestion: 'I am a teapot',
  segments: ['I am a teapot'],
}
const index = bruteForceIndex([doc1, doc2])

describe('Completer', () => {
  it('completes with step text', () => {
    const textDocuments = new TextDocuments<TextDocument>(TextDocument)
    const uri = 'test-uri'
    // @ts-ignore
    textDocuments._documents[uri] = TextDocument.create(uri, 'gherkin', 1, `Feature: Hello
  Scenario: World
    Given cukes
`)

    const completer = new Completer(textDocuments, index)

    const p: TextDocumentPositionParams = {
      textDocument: {
        uri: uri
      },
      position: {
        line: 2,
        character: 14
      }
    }

    const completions = completer.complete(p)
    const expectedCompletions: CompletionItem[] = [{
      label: 'I have {int} cukes in my belly',
      insertText: 'I have ${1|42,98|} cukes in my belly',
      insertTextFormat: InsertTextFormat.Snippet,
      kind: CompletionItemKind.Text,
    }]
    assert.deepStrictEqual(completions, expectedCompletions)
  })
})
