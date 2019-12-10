import SupportCodeExecutor from '../src/SupportCodeExecutor'
import assert from 'assert'
import TestWorld from './TestWorld'

describe('SupportCodeExecutor', () => {
  it('can attach attachments', () => {
    function body() {
      this.attach('hello', 'text/plain')
    }

    const executor = new SupportCodeExecutor(
      'step-definition-id',
      body,
      [],
      null,
      null
    )

    let attachedData: string
    const world = {
      testStepId: 'some-test-step-id',
      attach(data: string, contentType: string) {
        attachedData = data
      },
    }

    executor.execute(world)
    assert.strictEqual(attachedData, 'hello')
  })

  it('can handle a promise', async () => {
    function body() {
      return Promise.resolve('hello')
    }

    const executor = new SupportCodeExecutor(
      'step-definition-id',
      body,
      [],
      null,
      null
    )

    const result = await executor.execute(new TestWorld())
    assert.strictEqual(result, 'hello')
  })
})
