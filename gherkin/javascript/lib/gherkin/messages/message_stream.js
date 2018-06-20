'use strict'
var m = require('cucumber-messages').cucumber.messages
var Parser = require('../parser')
var Compiler = require('../pickles/compiler')

var Stream = require('stream')

/**
 * Stream that reads a Gherkin document as plain text and writes
 * events.
 */
class MessageStream extends Stream.Transform {
  constructor(includes, language) {
    super({objectMode: true})
    this._includeSource = includes.includeSource
    this._includeGherkinDocument = includes.includeGherkinDocument
    this._includePickles = includes.includePickles
    this._language = language

    this._parser = new Parser()
    this._compiler = new Compiler()
  }

  _transform(source, _, callback) {
    if (this._includeSource)
      this.push(source)
    try {
      var gherkinDocument = null
      if (this._includeGherkinDocument) {
        gherkinDocument = this._parser.parse(source.data, this._language)
        this.push(gherkinDocument)
      }
      if(this._includePickles) {
        if(!gherkinDocument)
          gherkinDocument = this._parser.parse(source.data)
        var pickles = this._compiler.compile(gherkinDocument, source.uri)
        for (var i in pickles) {
          this.push(pickles[i])
        }
      }
    } catch(err) {
      var errors = err.errors || [err]
      for(var i in errors) {
        var error = errors[i]
        this.push(
          m.Attachment.fromObject({
            source: m.SourceReference.fromObject({
              uri: source.uri,
              location: m.Location.fromObject({
                line: error.location.line,
                column: error.location.column
              })
            }),
            data: error.message
          })
        )
      }
    }
    callback()
  }
}

module.exports = MessageStream
