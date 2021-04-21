import assert from 'assert'
import * as messages from '@cucumber/messages'
import { NilCodeExecutor } from '../src/SupportCodeExecutor'
import PredictableHook from '../src/PredictableHook'

describe('PredictableHook', () => {
  const scenarioId = 'some-scenario-id'
  const pickle: messages.Pickle = {
    id: 'some-pickle-id',
    language: 'en',
    tags: [],
    steps: [],
    uri: 'some-uri',
    name: 'Some Name',
    astNodeIds: [scenarioId],
  }

  context('.match', () => {
    it('returns null when the pickle doe not reference the scenario id', () => {
      const hook = new PredictableHook(
        'some-hook-id',
        'another-scenario',
        'whatever:1',
        messages.TestStepResultStatus.PASSED,
        123
      )

      assert.strictEqual(hook.match(pickle), null)
    })

    it('returns a NilCodeExecutor when there is a match', () => {
      const hook = new PredictableHook(
        'some-hook-id',
        scenarioId,
        'whatever:1',
        messages.TestStepResultStatus.PASSED,
        123
      )

      assert.ok(hook.match(pickle) instanceof NilCodeExecutor)
    })
  })

  context('.toMessage', () => {
    it('returns the correct Location', () => {
      const hook = new PredictableHook(
        'some-hook-id',
        'another-scenario',
        'path/to/steps.go:13',
        messages.TestStepResultStatus.PASSED,
        123
      )
      const message = hook.toMessage().hook

      assert.strictEqual(message.sourceReference.uri, 'path/to/steps.go')
      assert.strictEqual(message.sourceReference.location.line, 13)
    })
  })
})
