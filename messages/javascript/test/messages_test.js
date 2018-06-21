const assert = require('assert')
const { Location, PickleDocString } = require('..').io.cucumber.messages

describe("messages", () => {
  it("builds a pickle doc string", () => {
    const location = Location.create({line: 10, column: 20})
    const pickleDocString = PickleDocString.create({location, contentType: 'text/plain', content: 'some\ncontent\n'})
    assert.deepEqual({ 
      location: { line: 10, column: 20 },
      contentType: 'text/plain',
      content: 'some\ncontent\n' 
    }, pickleDocString.toJSON())
  })
})