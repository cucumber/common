import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types'

import { AstBuilder, Errors, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin'
import { GherkinDocument, IdGenerator } from '@cucumber/messages'
import { Expression } from '@cucumber/cucumber-expressions'
import { walkGherkinDocument } from '@cucumber/gherkin-utils'

// https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#diagnostic
export function getGherkinDiagnostics(gherkinSource: string, expressions: readonly Expression[]): Diagnostic[] {
  const lines = gherkinSource.split(/\r?\n/)
  const diagnostics: Diagnostic[] = []
  const uuidFn = IdGenerator.uuid()
  const builder = new AstBuilder(uuidFn)
  const matcher = new GherkinClassicTokenMatcher()
  const parser = new Parser(builder, matcher)

  let gherkinDocument: GherkinDocument
  try {
    gherkinDocument = parser.parse(gherkinSource)
  } catch (err) {
    // TODO: Try to fix parse error so we can still validate other steps

    const errors: Error[] = err instanceof Errors.CompositeParserException ? err.errors : [err]
    for (const error of errors) {
      if (error instanceof Errors.GherkinException) {
        const line = error.location.line - 1
        const character = error.location.column !== undefined ? error.location.column - 1 : 0
        const diagnostic: Diagnostic = {
          severity: DiagnosticSeverity.Error,
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

  if (gherkinDocument) {
    walkGherkinDocument(gherkinDocument, undefined, {
      step(step) {
        if (isUndefined(step.text, expressions)) {
          const line = step.location.line -1
          const character = step.location.column -1 + step.keyword.length
          const diagnostic: Diagnostic = {
            severity: DiagnosticSeverity.Warning,
            range: {
              start: {
                line,
                character,
              },
              end: {
                line,
                character: character + step.text.length,
              },
            },
            message: `Undefined step: ${step.text}`,
            source: 'ex',
          }
          diagnostics.push(diagnostic)
        }
      },
    })
  }

  return diagnostics
}

function isUndefined(stepText: string, expressions: readonly Expression[]): boolean {
  for (const expression of expressions) {
    if (expression.match(stepText)) return false
  }
  return true
}

