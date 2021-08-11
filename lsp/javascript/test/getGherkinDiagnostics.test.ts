import assert from 'assert'
import getGherkinDiagnostics from '../src/getGherkinDiagnostics'
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver/node'

describe('getGherkinDiagnostics', () => {
  it('returns empty array for valid document', () => {
    const diagnostics = getGherkinDiagnostics(`Feature: Hello`)
    assert.deepStrictEqual(diagnostics, [])
  })

  it('returns one diagnostic for unexpected end of file', () => {
    const diagnostics = getGherkinDiagnostics(`Feature: Hello
@tag
`)
    assert.deepStrictEqual(diagnostics, [
      {
        message: '(3:0): unexpected end of file, expected: #TagLine, #RuleLine, #Comment, #Empty',
        range: {
          start: {
            line: 2,
            character: 0,
          },
          end: {
            line: 2,
            character: 0,
          },
        },
        severity: DiagnosticSeverity.Warning,
        source: 'ex'
      }
    ])
  })

  it('returns one diagnostic for missing table separator', () => {
    const diagnostics = getGherkinDiagnostics(`Feature: Hello
  Scenario: Hi
    Given a table:
      | a |
      | b
`)
    const expectedDiagnostics: Diagnostic[] = [
      {
        message: '(5:7): inconsistent cell count within the table',
        range: {
          start: {
            line: 4,
            character: 6,
          },
          end: {
            line: 4,
            character: 9,
          },
        },
        severity: DiagnosticSeverity.Warning,
        source: 'ex'
      }
    ]
    assert.deepStrictEqual(diagnostics, expectedDiagnostics)
  })
})
