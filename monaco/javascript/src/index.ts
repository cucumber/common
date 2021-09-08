import { Expression } from '@cucumber/cucumber-expressions'
import {
  getGherkinCompletionItems,
  getGherkinDiagnostics,
  getGherkinFormattingEdits,
  getGherkinSemanticTokens,
  semanticTokenModifiers,
  semanticTokenTypes,
} from '@cucumber/language-service'
import { Index } from '@cucumber/suggest'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'

type Monaco = typeof monacoEditor

export function configure(
  monaco: Monaco,
  editor: editor.IStandaloneCodeEditor,
  index: Index,
  expressions: readonly Expression[]
) {
  monaco.languages.register({ id: 'gherkin' })

  // Diagnostics (Syntax validation)
  function setDiagnosticMarkers() {
    const model = editor.getModel()
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

  function requestValidation() {
    window.requestAnimationFrame(() => {
      setDiagnosticMarkers()
    })
  }

  requestValidation()

  let validationTimeout: NodeJS.Timeout
  editor.onDidChangeModelContent(() => {
    clearTimeout(validationTimeout)
    validationTimeout = setTimeout(requestValidation, 500)
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
      // no-op
    },
    provideDocumentSemanticTokens: function (model) {
      const gherkinSource = model.getValue()
      const tokens = getGherkinSemanticTokens(gherkinSource, expressions)
      const data = new Uint32Array(tokens.data)
      return {
        data,
      }
    },
  })

  // Auto-Complete

  monaco.languages.registerCompletionItemProvider('gherkin', {
    provideCompletionItems: function (model, position) {
      const gherkinSource = model.getValue()
      const word = model.getWordUntilPosition(position)
      const completionItems = getGherkinCompletionItems(
        gherkinSource,
        position.lineNumber - 1,
        index
      )
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
        })),
      }
    },
  })

  // Document Formatting
  monaco.languages.registerDocumentFormattingEditProvider('gherkin', {
    provideDocumentFormattingEdits: function (model) {
      const gherkinSource = model.getValue()
      const textEdits = getGherkinFormattingEdits(gherkinSource)
      return textEdits.map((textEdit) => ({
        range: {
          startLineNumber: textEdit.range.start.line + 1,
          startColumn: textEdit.range.start.character + 1,
          endLineNumber: textEdit.range.end.line + 1,
          endColumn: textEdit.range.end.character + 1,
        },
        text: textEdit.newText,
      }))
    },
  })
}
