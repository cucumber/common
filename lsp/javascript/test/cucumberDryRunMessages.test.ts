import { spawn } from 'child_process'
import assert from 'assert'
import writeStepDocumentsJson from '../src/writeStepDocumentsJson'
import withTempFile from './withTempFile'
import fs from 'fs'

describe('cucumberDryRunMessages', () => {
  it('writes a step documents JSON file with spawn', async () => {
    const cucumber = spawn('npm', ['run', '--silent', 'cucumber', '--', '--profile', 'lsp'])
    await withTempFile(async (jsonPath) => {
      await writeStepDocumentsJson(cucumber, jsonPath)
      const json = fs.readFileSync(jsonPath, { encoding: 'utf-8' })
      assert.deepStrictEqual(JSON.parse(json).length, 7)
    })
  })
})
