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
import { Range, TextEdit } from 'vscode-languageserver-types'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import { editor, IRange } from 'monaco-editor/esm/vs/editor/editor.api'

type Monaco = typeof monacoEditor

export type ConfigureEditor = (editor: editor.IStandaloneCodeEditor) => void

export function configureMonaco(
  monaco: Monaco,
  index: Index,
  expressions: readonly Expression[]
): ConfigureEditor {
  monaco.languages.register({ id: 'gherkin' })

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
      const completionItems = getGherkinCompletionItems(
        gherkinSource,
        position.lineNumber - 1,
        index
      )
      return {
        suggestions: completionItems.map((completionItem) => ({
          label: completionItem.label,
          kind: monaco.languages.CompletionItemKind.Text,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          insertText: (completionItem.textEdit as TextEdit).newText,
          range: convertRange((completionItem.textEdit as TextEdit).range),
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
        range: convertRange(textEdit.range),
        text: textEdit.newText,
      }))
    },
  })

  return function(editor) {
    // Diagnostics (Syntax validation)
    function setDiagnosticMarkers() {
      const model = editor.getModel()
      const gherkinSource = model.getValue()
      const diagnostics = getGherkinDiagnostics(gherkinSource, expressions)
      const markers: monacoEditor.editor.IMarkerData[] = diagnostics.map((diagnostic) => {
        return {
          ...(convertRange(diagnostic.range)),
          severity: monaco.MarkerSeverity.Error,
          message: diagnostic.message,
        }
      })
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
  }
}

function convertRange(range: Range): IRange {
  return {
    startLineNumber: range.start.line + 1,
    startColumn: range.start.character + 1,
    endLineNumber: range.end.line + 1,
    endColumn: range.end.character + 1,
  }
}
