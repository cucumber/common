import { walkGherkinDocument } from '@cucumber/gherkin-utils'
import { Index, lspCompletionSnippet } from '@cucumber/suggest'
import { CompletionItem, CompletionItemKind, InsertTextFormat } from 'vscode-languageserver-types'
import { parseGherkinDocument } from './parseGherkinDocument'

// https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_completion
export function getGherkinCompletionItems(
  gherkinSource: string,
  line: number,
  index: Index
): CompletionItem[] {
  const { gherkinDocument } = parseGherkinDocument(gherkinSource)
  if (!gherkinDocument) {
    return []
  }
  let text: string
  walkGherkinDocument(gherkinDocument, undefined, {
    step(step) {
      if (step.location.line === line + 1) {
        text = step.text
      }
    },
  })
  const stepDocuments = index(text)
  return stepDocuments.map((stepDocument) => ({
    label: stepDocument.suggestion,
    insertText: lspCompletionSnippet(stepDocument.segments),
    insertTextFormat: InsertTextFormat.Snippet,
    kind: CompletionItemKind.Text,
  }))
}
