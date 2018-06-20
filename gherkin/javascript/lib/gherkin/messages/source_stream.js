'use strict'
var m = require('cucumber-messages').cucumber.messages

const Stream = require('stream')

/**
 * Stream that reads a Gherkin document as plain text and writes
 * events.
 */
class SourceStream extends Stream.Transform {
  constructor(path) {
    super({ objectMode: true })
    if(typeof path !== 'string') throw new Error('Not string:' + path)
    this._path = path
    this._gherkin = ""
  }

  _transform(chunk, _, callback) {
    this._gherkin += chunk
    callback()
  }

  _flush(callback) {
    this.push(m.Source.create({
      uri: this._path,
      data: this._gherkin,
      media: m.Media.create({
        encoding: 'UTF-8',
        contentType: 'text/x.cucumber.gherkin+plain'
      })
    }))
    callback()
  }
}

module.exports = SourceStream
