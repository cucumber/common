import SupportCodeExecutor from '../src/SupportCodeExecutor'
import assert from 'assert'

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
})
