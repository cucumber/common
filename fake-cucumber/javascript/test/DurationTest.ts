import Duration from '../src/Duration'
import assert from 'assert'

describe('Duration', () => {
  describe('#toMessage', () => {
    it('computes nanos and seconds', function() {
      const msg = new Duration(1234567890).toMessage()
      assert.strictEqual(msg.seconds, 1)
      assert.strictEqual(msg.nanos, 234567890)
    })
  })
})
