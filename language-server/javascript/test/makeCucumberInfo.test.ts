import assert from 'assert'
import fs from 'fs'
import { makeCucumberInfo } from '../src/makeCucumberInfo'

describe('makeCucumberInfo', () => {
  it('builds CucumberInfo', async () => {
    const messages = fs.readFileSync(__dirname + '/fixtures/suggest.ndjson', 'utf-8')
    const cucumberInfo = await makeCucumberInfo('echo', [messages])
    assert.strictEqual(cucumberInfo.stepDocuments.length, 7)
    assert.strictEqual(cucumberInfo.expressions.length, 7)
  })
})
