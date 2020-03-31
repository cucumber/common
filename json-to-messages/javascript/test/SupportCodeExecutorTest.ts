import assert from 'assert'
import { NilCodeExecutor } from '../src/SupportCodeExecutor'

describe('NilCodeExecutor', () => {
  const executor = new NilCodeExecutor('some-id')
  context('.execute', () => {
    it('does nothings', () => {
      assert.strictEqual(executor.execute(), undefined)
    })
  })
})
