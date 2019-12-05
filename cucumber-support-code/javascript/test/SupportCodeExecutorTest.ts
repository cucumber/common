import assert from 'assert'
import SupportCodeExecutor from '../src/SupportCodeExecutor'

describe('SupportCodeExecutor', () => {
  context('#execute', () => {
    it('runs the code provided on creation', () => {
      const supportCodeExecutor = new SupportCodeExecutor(() => 'executed !')

      assert.strictEqual(supportCodeExecutor.execute(), 'executed !')
    })

    it('accept any arguments', () => {
      const supportCodeExecutor = new SupportCodeExecutor(
        (a, b, c) => a + b + c
      )

      assert.strictEqual(supportCodeExecutor.execute(1, 2, 3), 6)
    })
  })
})
