import assert from 'assert'
import { messages } from '@cucumber/messages'
import {
  PassedCodeExecutor,
  FailedCodeExecutor,
} from '../src/SupportCodeExecutor'
import Hook from '../src/Hook'

describe('Hook', () => {
  const scenarioId = 'some-scenario-id'
  const pickle = messages.Pickle.create({
    id: 'some-pickle-id',
    astNodeIds: [scenarioId],
  })

  context('.match', () => {
    it('returns null when the pickle doe not reference the scenario id', () => {
      const hook = new Hook('some-hook-id', 'another-scenario', 'whatever:1')

      assert.equal(hook.match(pickle), null)
    })

    it('returns a SupportCodeExecutor when there is a match', () => {
      const hook = new Hook('some-hook-id', scenarioId, 'whatever:1')

      assert.ok(hook.match(pickle) instanceof PassedCodeExecutor)
    })

    it('returns a FailedCodeExecutor when there is a match and a stacktrace was provided', () => {
      const hook = new Hook(
        'some-hook-id',
        scenarioId,
        'whatever:1',
        'Woops ...'
      )

      assert.ok(hook.match(pickle) instanceof FailedCodeExecutor)
    })
  })

  context('.toMessage', () => {
    it('returns the correct Location', () => {
      const hook = new Hook(
        'some-hook-id',
        'another-scenario',
        'path/to/steps.go:13'
      )
      const message = hook.toMessage().hook

      assert.equal(message.sourceReference.uri, 'path/to/steps.go')
      assert.equal(message.sourceReference.location.line, 13)
    })
  })
})
