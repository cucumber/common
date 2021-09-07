import { TextEdit } from "vscode-languageserver-types";
import { parseGherkinDocument } from './parseGherkinDocument'
import { pretty } from '@cucumber/gherkin-utils'

// https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_formatting
export function getGherkinFormattingEdits(gherkinSource: string): TextEdit[] {
  const { gherkinDocument } = parseGherkinDocument(gherkinSource)
  const newText = pretty(gherkinDocument)
  const lines = gherkinSource.split(/\r?\n/)
  const line = lines.length - 1
  const character = lines[line].length
  const textEdit: TextEdit = {
    newText,
    range: {
      start: {
        line: 0,
        character: 0
      },
      end: {
        line,
        character
      }
    }
  }
  return [textEdit]
}
