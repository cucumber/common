import assert from 'assert'
import { TextEdit } from 'vscode-languageserver-types'
import { getGherkinFormattingEdits } from '../src'

describe('getGherkinFormattingEdits', () => {
  it('returns text edits that prettifies a Gherkin document', () => {
    const gherkinSource = `Feature: Hello
Scenario: World
Given something`
    const textEdits = getGherkinFormattingEdits(gherkinSource)
    const expectedTextEdit: TextEdit = {
      newText: `Feature: Hello

  Scenario: World
    Given something
`,
      range: {
        start: {
          line: 0,
          character: 0,
        },
        end: {
          line: 2,
          character: 15
        }
      }
    }
    assert.deepStrictEqual([expectedTextEdit], textEdits)
  })
})
