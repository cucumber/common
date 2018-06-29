'use strict'
var m = require('cucumber-messages').io.cucumber.messages
var Parser = require('../parser')
var PickleCompiler = require('../pickles/pickle_compiler')

var Stream = require('stream')

/**
 * Stream that reads a Gherkin document as plain text and writes
 * events.
 */
class MessageStream extends Stream.Transform {
  constructor(options, language) {
    super({objectMode: true})
    this._includeSource = options.includeSource
    this._includeGherkinDocument = options.includeGherkinDocument
    this._includePickles = options.includePickles
    this._language = language

    this._parser = new Parser()
    this._compiler = new PickleCompiler()
  }

  _transform(source, _, callback) {
    if (this._includeSource)
      this.push(m.Wrapper.fromObject({source: source}))
    try {
      var gherkinDocument = null
      if (this._includeGherkinDocument) {
        gherkinDocument = this._buildGherkinDocument(source)
        this.push(m.Wrapper.fromObject({gherkinDocument: gherkinDocument}))
      }
      if(this._includePickles) {
        if(!gherkinDocument)
          gherkinDocument = this._buildGherkinDocument(source)
        var pickles = this._compiler.compile(gherkinDocument, source.uri)
        for (var i in pickles) {
          this.push(m.Wrapper.fromObject({pickle: pickles[i]}))
        }
      }
    } catch(err) {
      var errors = err.errors || [err]
      for(var i in errors) {
        var error = errors[i]
        this.push(
          m.Wrapper.fromObject({
            attachment: m.Attachment.fromObject({
              source: m.SourceReference.fromObject({
                uri: source.uri,
                location: m.Location.fromObject({
                  line: error.location.line,
                  column: error.location.column
                })
              }),
              data: error.message
            })
          })
        )
      }
    }
    callback()
  }

  _buildGherkinDocument(source) {
    var gherkinDocumentProperties = this._parser.parse(source.data, this._language);
    return m.GherkinDocument.fromObject(Object.assign(gherkinDocumentProperties, {uri: source.uri}));
  }
}

module.exports = MessageStream
