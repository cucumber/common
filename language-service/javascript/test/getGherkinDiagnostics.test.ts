import assert from 'assert'
import { getGherkinDiagnostics } from '../src'
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types'
import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'

describe('getGherkinDiagnostics', () => {
  it('returns no diagnostics for valid document', () => {
    const diagnostics = getGherkinDiagnostics(`Feature: Hello`, [])
    assert.deepStrictEqual(diagnostics, [])
  })

  it('returns error diagnostic for unexpected end of file', () => {
    const diagnostics = getGherkinDiagnostics(
      `Feature: Hello
@tag
`,
      []
    )
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
        severity: DiagnosticSeverity.Error,
        source: 'ex',
      },
    ])
  })

  it('returns error diagnostic for missing table separator', () => {
    const expression = new CucumberExpression('a table:', new ParameterTypeRegistry())
    const diagnostics = getGherkinDiagnostics(
      `Feature: Hello
  Scenario: Hi
    Given a table:
      | a |
      | b
`,
      [expression]
    )
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
        severity: DiagnosticSeverity.Error,
        source: 'ex',
      },
    ]
    assert.deepStrictEqual(diagnostics, expectedDiagnostics)
  })

  it('returns warning diagnostic for undefined step', () => {
    const diagnostics = getGherkinDiagnostics(
      `Feature: Hello
  Scenario: Hi
    Given an undefined step
`,
      []
    )
    const expectedDiagnostics: Diagnostic[] = [
      {
        message: 'Undefined step: an undefined step',
        range: {
          start: {
            line: 2,
            character: 10,
          },
          end: {
            line: 2,
            character: 27,
          },
        },
        severity: DiagnosticSeverity.Warning,
        source: 'ex',
      },
    ]
    assert.deepStrictEqual(diagnostics, expectedDiagnostics)
  })

  it('does not return warning diagnostic for undefined step in Scenario Outline', () => {
    const diagnostics = getGherkinDiagnostics(
      `Feature: Hello
  Scenario: Hi
    Given an undefined step

    Examples: Hello
`,
      []
    )
    const expectedDiagnostics: Diagnostic[] = []
    assert.deepStrictEqual(diagnostics, expectedDiagnostics)
  })
})
