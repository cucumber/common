import assert from 'assert'
import { TimeConversion } from '../src'

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
    const durationInMilliseconds = 1.234
    const duration = millisecondsToDuration(durationInMilliseconds)
    const durationMillisAgain = durationToMilliseconds(duration)

    assert.strictEqual(durationMillisAgain, durationInMilliseconds)
  })
})
