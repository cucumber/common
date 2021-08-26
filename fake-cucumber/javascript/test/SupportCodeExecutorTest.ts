import SupportCodeExecutor from '../src/SupportCodeExecutor.js'
import assert from 'assert'
import TestWorld from './TestWorld.js'

describe('SupportCodeExecutor', () => {
  it('can wait for a promise', async () => {
    function body() {
      return Promise.resolve('hello')
    }

    const executor = new SupportCodeExecutor('step-definition-id', body, [], null, null)

    const result = await executor.execute(new TestWorld())
    assert.strictEqual(result, 'hello')
  })
})
