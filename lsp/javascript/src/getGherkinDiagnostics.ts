import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver/node'

import { AstBuilder, Errors, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin'
import { IdGenerator } from '@cucumber/messages'

export default function getGherkinDiagnostics(gherkinSource: string): Diagnostic[] {
  const lines = gherkinSource.split(/\r?\n/)
  const diagnostics: Diagnostic[] = []
  const uuidFn = IdGenerator.uuid()
  const builder = new AstBuilder(uuidFn)
  const matcher = new GherkinClassicTokenMatcher()
  const parser = new Parser(builder, matcher)

  try {
    parser.parse(gherkinSource)
  } catch (err) {
    const errors: Error[] = err instanceof Errors.CompositeParserException ? err.errors : [err]
    for (const error of errors) {
      if (error instanceof Errors.GherkinException) {
        const line = error.location.line - 1
        const character = error.location.column !== undefined ? error.location.column - 1 : 0
        const diagnostic: Diagnostic = {
          severity: DiagnosticSeverity.Warning,
          range: {
            start: {
              line,
              character,
            },
            end: {
              line,
              character: lines[line].length,
            },
          },
          message: error.message,
          source: 'ex',
        }
        diagnostics.push(diagnostic)
      }
    }
  }

  return diagnostics
}
