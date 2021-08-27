import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import {
  getGherkinCompletionItems,
  getGherkinSemanticTokens,
  semanticTokenModifiers,
  semanticTokenTypes
} from '@cucumber/language-service'
import { Index } from '@cucumber/suggest'
import { Expression } from '@cucumber/cucumber-expressions'

type Monaco = typeof monacoEditor

export function configure(monaco: Monaco, index: Index | undefined, expressions: readonly Expression[]) {
  monaco.languages.register({ id: 'gherkin' })

  // https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-semantic-tokens-provider-example
  monaco.languages.registerDocumentSemanticTokensProvider('gherkin', {
    getLegend: function () {
      return {
        tokenTypes: semanticTokenTypes,
        tokenModifiers: semanticTokenModifiers,
      }
    },
    releaseDocumentSemanticTokens: function () {
    },
    provideDocumentSemanticTokens: function (model) {
      const gherkinSource = model.getValue()
      const tokens = getGherkinSemanticTokens(gherkinSource, expressions)
      const data = new Uint32Array(tokens.data)
      return {
        data
      }
    }
  })

  if (index) {
    monaco.languages.registerCompletionItemProvider('gherkin', {
      provideCompletionItems: function (model, position) {
        const gherkinSource = model.getValue()
        const word = model.getWordUntilPosition(position)
        const completionItems = getGherkinCompletionItems(gherkinSource, position.lineNumber -1, index)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        }
        return {
          suggestions: completionItems.map((ci) => ({
            label: ci.label,
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: ci.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          }))
        }
      }
    })
  }
}
