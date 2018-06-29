const assert = require('assert')
const fs = require('fs')
const SourceStream = require('../../lib/gherkin/messages/source_stream')

describe('SourceStream', () => {
  it("transforms file contents to source message", (callback) => {
    let source = null
    const sourceStream = new SourceStream('test.feature')
    sourceStream.on('data', data => source = data)
    sourceStream.on('end', () => {
      assert.deepEqual(source.toJSON(), {
        data: "Feature: Hello\n  Scenario: World\n    Given a step",
        media: {
          "contentType": "text/x.cucumber.gherkin+plain",
          "encoding": "UTF-8"
        },
        uri: "test.feature"
      })
      callback()
    })
    fs.createReadStream(__dirname + '/test.feature', {encoding: 'UTF-8'}).pipe(sourceStream)
  })
})
