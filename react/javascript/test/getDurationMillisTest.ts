import { messages } from '@cucumber/messages'
import assert from 'assert'
import getDurationsMillis from '../src/getDurationMillis'

describe('getDurationMillis', () => {
  it('returns undefined when one or both or messages are missing', () => {
    const started = messages.TestRunStarted.create()
    const ended = messages.TestRunStarted.create()

    assert.strictEqual(getDurationsMillis(started, undefined), undefined)
    assert.strictEqual(getDurationsMillis(undefined, ended), undefined)
    assert.strictEqual(getDurationsMillis(undefined, undefined), undefined)
  })

  it('computes the number of millis seconds between the start and end of the run', () => {
    const started = messages.TestRunStarted.create({
      timestamp: messages.Timestamp.create({ seconds: 12 }),
    })
    const ended = messages.TestRunStarted.create({
      timestamp: messages.Timestamp.create({ seconds: 14 }),
    })

    assert.strictEqual(getDurationsMillis(started, ended), 2000)
  })

  it('no precision is provided', () => {
    const started = messages.TestRunStarted.create({
      timestamp: messages.Timestamp.create({ seconds: 12, nanos: 123456789 }),
    })
    const ended = messages.TestRunStarted.create({
      timestamp: messages.Timestamp.create({ seconds: 14, nanos: 234567890 }),
    })

    assert.strictEqual(getDurationsMillis(started, ended), 2111.1111010000004)
  })
})
