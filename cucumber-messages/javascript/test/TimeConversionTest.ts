import * as assert from 'assert'
import {
  durationToMilliseconds,
  millisecondsSinceEpochToTimestamp,
  millisecondsToDuration,
  timestampToMillisecondsSinceEpoch,
} from '../src/TimeConversion'

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
})
