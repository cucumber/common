import * as messages from '@cucumber/messages'
import assert from 'assert'
import getDurationsMillis from '../src/getDurationMillis'

describe('getDurationMillis', () => {
  it('returns undefined when one or both or messages are missing', () => {
    const started: messages.TestRunStarted = {
      timestamp: { seconds: 12, nanos: 0 },
    }
    const ended: messages.TestRunFinished = {
      timestamp: { seconds: 14, nanos: 0 },
      success: true,
    }

    assert.strictEqual(getDurationsMillis(started, undefined), undefined)
    assert.strictEqual(getDurationsMillis(undefined, ended), undefined)
    assert.strictEqual(getDurationsMillis(undefined, undefined), undefined)
  })

  it('computes the number of millis seconds between the start and end of the run', () => {
    const started: messages.TestRunStarted = {
      timestamp: { seconds: 12, nanos: 0 },
    }
    const ended: messages.TestRunFinished = {
      timestamp: { seconds: 14, nanos: 0 },
      success: true,
    }

    assert.strictEqual(getDurationsMillis(started, ended), 2000)
  })

  it('has fine grained precision', () => {
    const started: messages.TestRunStarted = {
      timestamp: { seconds: 12, nanos: 123456789 },
    }
    const ended: messages.TestRunFinished = {
      timestamp: { seconds: 14, nanos: 234567890 },
      success: true,
    }

    assert.strictEqual(getDurationsMillis(started, ended), 2111.1111010000004)
  })
})
