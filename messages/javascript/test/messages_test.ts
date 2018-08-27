/* eslint-env mocha */
const assert = require('assert')
const messages = require('../src/cucumber-messages').io.cucumber.messages;

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
