import {
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
  TextDocument,
  TextDocumentPositionParams,
  TextDocuments
} from 'vscode-languageserver/node'
import { Index, lspCompletionSnippet } from '@cucumber/suggest'


import { AstBuilder, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin'
import { IdGenerator } from '@cucumber/messages'
import { GherkinDocumentWalker } from '@cucumber/gherkin-utils'

const uuidFn = IdGenerator.uuid()
const builder = new AstBuilder(uuidFn)
const matcher = new GherkinClassicTokenMatcher()

const parser = new Parser(builder, matcher)

export default class Completer {
  constructor(private readonly documents: TextDocuments<TextDocument>, private readonly index: Index) {
  }

  complete(p: TextDocumentPositionParams): CompletionItem[] {
    const doc = this.documents.get(p.textDocument.uri)
    const gherkinDocument = parser.parse(doc.getText())
    let text: string
    const walker = new GherkinDocumentWalker(undefined, {
      handleStep(step) {
        if(step.location.line === p.position.line + 1) {
          text = step.text
        }
      }
    })
    walker.walkGherkinDocument(gherkinDocument)
    const stepDocuments = this.index(text)
    const completionItems: CompletionItem[] = stepDocuments.map(stepDocument => ({
      label: stepDocument.suggestion,
      insertText: lspCompletionSnippet(stepDocument.segments),
      insertTextFormat: InsertTextFormat.Snippet,
      kind: CompletionItemKind.Text,
    }))
    return completionItems
  }
}
