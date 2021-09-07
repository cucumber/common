import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import {
  getGherkinCompletionItems,
  getGherkinDiagnostics,
  getGherkinSemanticTokens,
  getGherkinFormattingEdits,
  semanticTokenModifiers,
  semanticTokenTypes
} from '@cucumber/language-service'
import { Index } from '@cucumber/suggest'
import { Expression } from '@cucumber/cucumber-expressions'

type Monaco = typeof monacoEditor

export function configure(monaco: Monaco, index: Index | undefined, expressions: readonly Expression[]) {
  monaco.languages.register({ id: 'gherkin' })

  // Diagnostics (Syntax validation)

  monaco.editor.onDidCreateModel((model) => {
    function validate() {
      const gherkinSource = model.getValue()
      const diagnostics = getGherkinDiagnostics(gherkinSource, expressions)
      const markers: monacoEditor.editor.IMarkerData[] = diagnostics.map((d) => ({
        severity: monaco.MarkerSeverity.Error,
        message: d.message,
        startLineNumber: d.range.start.line + 1,
        startColumn: d.range.start.character + 1,
        endLineNumber: d.range.end.line + 1,
        endColumn: d.range.end.character + 1,
      }))
      monaco.editor.setModelMarkers(model, 'gherkin', markers)
    }

    let timeout: any
    model.onDidChangeContent(() => {
      // debounce
      clearTimeout(timeout)
      timeout = setTimeout(() => validate(), 500)
    })
    validate()
  })

  // Syntax Highlighting (Semantic Tokens)

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

  // Auto-Complete

  monaco.languages.registerCompletionItemProvider('gherkin', {
    provideCompletionItems: function (model, position) {
      const gherkinSource = model.getValue()
      const word = model.getWordUntilPosition(position)
      const completionItems = getGherkinCompletionItems(gherkinSource, position.lineNumber - 1, index)
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

  // Document Formatting
  monaco.languages.registerDocumentFormattingEditProvider('gherkin', {
    provideDocumentFormattingEdits: function (model) {
      const gherkinSource = model.getValue()
      const textEdits = getGherkinFormattingEdits(gherkinSource)
      return textEdits.map(textEdit => ({
        range: {
          startLineNumber: textEdit.range.start.line + 1,
          startColumn: textEdit.range.start.character + 1,
          endLineNumber: textEdit.range.end.line + 1,
          endColumn: textEdit.range.end.character + 1,
        },
        text: textEdit.newText
      }))
    }
  })
}
