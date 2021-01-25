import assert from 'assert'
import { messages } from '../src'

describe('time deserialisation', () => {
  it('should realise int64 values numbers, even if deserialised from strings', () => {
    const timestamp = messages.Timestamp.fromObject({
      seconds: '123',
      nanos: 456,
    })

    assert.strict.equal('number', typeof timestamp.seconds)
  })
})
