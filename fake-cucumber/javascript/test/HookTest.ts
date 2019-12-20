import assert from 'assert'
import Hook from '../src/Hook'
import { messages } from 'cucumber-messages'
import TestWorld from './TestWorld'

describe('Hook', () => {
  describe('#match', () => {
    it("does not return a SupportCodeExecutor if the hook's tag expression does not match", () => {
      const hook = new Hook('hook-id', 'not @foo', null, () => {
        throw new Error('unexpected')
      })
      const pickle = new messages.Pickle({
        tags: [new messages.Pickle.PickleTag({ name: '@foo' })],
      })
      const executor = hook.match(pickle)

      assert.equal(executor, null)
    })

    it("returns a SupportCodeExecutor if the hook's tag expression matches", () => {
      const hook = new Hook('hook-id', 'not @foo', null, () => {
        return 'something'
      })
      const pickle = new messages.Pickle({
        tags: [new messages.Pickle.PickleTag({ name: '@bar' })],
      })
      const executor = hook.match(pickle)

      assert.strictEqual(executor.execute(new TestWorld()), 'something')
    })

    it('returns a SupportCodeExecutor if the hook has no tag expression', () => {
      const hook = new Hook('hook-id', null, null, () => {
        return 'something'
      })
      const pickle = new messages.Pickle({
        tags: [new messages.Pickle.PickleTag({ name: '@bar' })],
      })
      const executor = hook.match(pickle)

      assert.strictEqual(executor.execute(new TestWorld()), 'something')
    })
  })
})
