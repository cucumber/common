import assert from 'assert'
import { TimeConversion, messages } from '../src'
import { addDurations } from '../src/TimeConversion'

const {
  durationToMilliseconds,
  millisecondsSinceEpochToTimestamp,
  millisecondsToDuration,
  timestampToMillisecondsSinceEpoch,
} = TimeConversion

describe('TimeConversion', () => {
  it('converts to and from milliseconds since epoch', () => {
    const millisecondsSinceEpoch = Date.now()
    const timestamp = millisecondsSinceEpochToTimestamp(millisecondsSinceEpoch)
    const jsEpochMillisAgain = timestampToMillisecondsSinceEpoch(timestamp)

    assert.strictEqual(jsEpochMillisAgain, millisecondsSinceEpoch)
  })

  it('converts to and from milliseconds duration', () => {
    const durationInMilliseconds = 1234
    const duration = millisecondsToDuration(durationInMilliseconds)
    const durationMillisAgain = durationToMilliseconds(duration)

    assert.strictEqual(durationMillisAgain, durationInMilliseconds)
  })

  it('converts to and from milliseconds duration (with decimal places)', () => {
    const durationInMilliseconds = 3.000161
    const duration = millisecondsToDuration(durationInMilliseconds)
    const durationMillisAgain = durationToMilliseconds(duration)

    assert.strictEqual(durationMillisAgain, durationInMilliseconds)
  })

  it('adds durations (nanos only)', () => {
    const durationA = millisecondsToDuration(100)
    const durationB = millisecondsToDuration(200)
    const sumDuration = addDurations(durationA, durationB)

    assert.deepStrictEqual(sumDuration, new messages.Duration({ seconds: 0, nanos: 3e8 }))
  })

  it('adds durations (seconds only)', () => {
    const durationA = millisecondsToDuration(1000)
    const durationB = millisecondsToDuration(2000)
    const sumDuration = addDurations(durationA, durationB)

    assert.deepStrictEqual(sumDuration, new messages.Duration({ seconds: 3, nanos: 0 }))
  })

  it('adds durations (seconds and nanos)', () => {
    const durationA = millisecondsToDuration(1500)
    const durationB = millisecondsToDuration(1600)
    const sumDuration = addDurations(durationA, durationB)

    assert.deepStrictEqual(sumDuration, new messages.Duration({ seconds: 3, nanos: 1e8 }))
  })
})
