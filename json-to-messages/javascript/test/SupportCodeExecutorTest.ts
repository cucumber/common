import assert from 'assert'
import {
  PassedCodeExecutor,
  PendingCodeExecutor,
  FailedCodeExecutor,
} from '../src/SupportCodeExecutor'

describe('PassedCodeExecutor', () => {
  const executor = new PassedCodeExecutor('some-id')
  context('.execute', () => {
    it('does nothings', () => {
      assert.strictEqual(executor.execute(), undefined)
    })
  })
})

describe('PendingCodeExecutor', () => {
  const executor = new PendingCodeExecutor('some-id')
  context('.execute', () => {
    it('return the string "pending"', () => {
      assert.strictEqual(executor.execute(), 'pending')
    })
  })
})

describe('FailedCodeExecutor', () => {
  const stacktrace = [
    'Woops (RuntimeError)',
    './features/statuses/statuses_steps.rb:5:in `"a failed step"',
    "features/statuses/statuses.feature:9:in `a failed step'",
  ].join('\n')
  const executor = new FailedCodeExecutor('some-id', stacktrace)

  context('.execute', () => {
    it('raises an exception', () => {
      assert.throws(() => {
        executor.execute()
      })
    })

    it('produces the correct stack trace', () => {
      try {
        executor.execute()
      } catch (err) {
        assert.strictEqual(err.msg, 'Woops (RuntimeError)')
        assert.strictEqual(
          err.stack,
          [
            './features/statuses/statuses_steps.rb:5:in `"a failed step"',
            "features/statuses/statuses.feature:9:in `a failed step'",
          ].join('\n')
        )
      }
    })
  })
})
