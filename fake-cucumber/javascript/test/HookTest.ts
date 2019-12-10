import assert from 'assert'
import { HookType } from '../src/IHook'
import Hook from '../src/Hook'
import { messages } from 'cucumber-messages'
import TestWorld from './TestWorld'

describe('Hook', () => {
  describe('#match', () => {
    it("does not return a SupportCodeExecutor if the hook's tag expression does not match", () => {
      const hook = new Hook('hook-id', HookType.Before, 'not @foo', () => {
        throw new Error('unexpected')
      })
      const pickle = new messages.Pickle({
        tags: [new messages.Pickle.PickleTag({ name: '@foo' })],
      })
      const executor = hook.match(pickle, HookType.Before)

      assert.equal(executor, null)
    })

    it("returns a SupportCodeExecutor if the hook's tag expression matches", () => {
      const hook = new Hook('hook-id', HookType.Before, 'not @foo', () => {
        return 'something'
      })
      const pickle = new messages.Pickle({
        tags: [new messages.Pickle.PickleTag({ name: '@bar' })],
      })
      const executor = hook.match(pickle, HookType.Before)

      assert.strictEqual(executor.execute(new TestWorld()), 'something')
    })

    it('returns a SupportCodeExecutor if the hook has no tag expression', () => {
      const hook = new Hook('hook-id', HookType.Before, null, () => {
        return 'something'
      })
      const pickle = new messages.Pickle({
        tags: [new messages.Pickle.PickleTag({ name: '@bar' })],
      })
      const executor = hook.match(pickle, HookType.Before)

      assert.strictEqual(executor.execute(new TestWorld()), 'something')
    })

    it('does not return a SupportCodeExecutor if the hook type does not match', () => {
      const hook = new Hook('hook-id', HookType.Before, null, () => {
        return 'something'
      })
      const pickle = new messages.Pickle()
      const executor = hook.match(pickle, HookType.After)

      assert.equal(executor, null)
    })
  })
})
