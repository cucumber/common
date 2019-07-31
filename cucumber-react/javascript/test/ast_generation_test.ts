import { messages } from "cucumber-messages"
import testJson from "../testdata/test.json"
import assert from "assert"
import IGherkinDocument = messages.IGherkinDocument

describe('AST Generation', () => {
  it('generates a proper document', () => {
    const feature = (testJson.gherkinDocument as IGherkinDocument).feature
    assert.strictEqual(feature.children[1].scenario.name, 'C')
  })
})
