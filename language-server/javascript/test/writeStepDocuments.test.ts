import assert from 'assert'
import writeStepDocumentsJson from '../src/writeStepDocumentsJson'
import withTempFile from './withTempFile'
import fs from 'fs'

describe('cucumberDryRunMessages', () => {
  it('writes a step documents JSON file with spawn', async () => {
    await withTempFile(async (jsonPath) => {
      const messages = fs.readFileSync(__dirname + '/fixtures/suggest.ndjson', 'utf-8')
      await writeStepDocumentsJson('echo', [messages], jsonPath)
      const json = fs.readFileSync(jsonPath, { encoding: 'utf-8' })
      assert.deepStrictEqual(JSON.parse(json).length, 7)
    })
  })
})
