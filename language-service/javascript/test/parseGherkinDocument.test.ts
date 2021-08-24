import { parseGherkinDocument } from '../src/parseGherkinDocument'
import assert from 'assert'

describe('parseGherkinDocument', () => {
  it('returns a GherkinDocument for unexpected EOF', () => {
    const source = `Feature: Hello
@tag
`
    const { gherkinDocument, error } = parseGherkinDocument(source)
    assert.strictEqual(gherkinDocument.feature.name, 'Hello')
    assert.strictEqual(
      error.message,
      'Parser errors:\n(3:0): unexpected end of file, expected: #TagLine, #RuleLine, #Comment, #Empty'
    )
  })
})
