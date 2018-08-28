/* eslint-env mocha */
import * as assert from 'assert'
import * as cm from '../src/cucumber-messages'
const messages = cm.io.cucumber.messages

describe('messages', () => {
  it('builds a pickle doc string', () => {
    const location = messages.Location.create({ line: 10, column: 20 })
    const pickleDocString = messages.PickleDocString.create({
      location,
      contentType: 'text/plain',
      content: 'some\ncontent\n',
    })
    assert.deepStrictEqual(
      {
        location: { line: 10, column: 20 },
        contentType: 'text/plain',
        content: 'some\ncontent\n',
      },
      pickleDocString.toJSON()
    )
  })

  it('roundtrips', () => {
    const location = messages.Location.create({ line: 10, column: 20 })
    const pickleDocString = messages.PickleDocString.create({
      location,
      contentType: 'text/plain',
      content: 'some\ncontent\n',
    })
    const buffer = messages.PickleDocString.encodeDelimited(pickleDocString).finish()
    const pds = messages.PickleDocString.decodeDelimited(buffer)
    assert.deepStrictEqual(pds, pickleDocString)
  })
})
