import assert from 'assert'
import { HookType } from '../src/IHook'
import ScenarioNameHook from '../src/ScenarioNameHook'
import { messages } from 'cucumber-messages'
import SupportCodeExecutor from '../src/SupportCodeExecutor'

describe('ScenarioNameHook', () => {
  describe('#match', () => {
    it('return a SupportCodeExecutor if the name of the pickle matches', () => {
      const hook = new ScenarioNameHook(
        HookType.Before,
        /passed before hook/,
        () => 'pending'
      )
      const pickle = new messages.Pickle({
        name: 'My scenario with a passed before hook',
      })
      const match = hook.match(pickle, HookType.Before)

      assert.ok(match instanceof SupportCodeExecutor)
      assert.strictEqual(match.execute(), 'pending')
    })

    it('returns undefined if the type does not match', () => {
      const hook = new ScenarioNameHook(
        HookType.Before,
        /passed before hook/,
        () => 'pending'
      )
      const pickle = new messages.Pickle({
        name: 'My scenario with a passed before hook',
      })
      const match = hook.match(pickle, HookType.After)

      assert.strictEqual(match, undefined)
    })

    it('return undefined when there is no match in the scenario name', () => {
      const hook = new ScenarioNameHook(
        HookType.Before,
        /passed before hook/,
        () => undefined
      )
      const pickle = new messages.Pickle({
        name: 'My scenario with a failed before hook',
      })
      const match = hook.match(pickle, HookType.Before)

      assert.strictEqual(match, undefined)
    })
  })
})
