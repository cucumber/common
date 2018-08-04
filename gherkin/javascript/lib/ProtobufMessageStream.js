const Stream = require('stream')
let Reader
try {
  // If cucumber-messages is `npm link`ed, use this
  Reader = require('cucumber-messages/node_modules/protobufjs').Reader
} catch (ignore) {
  // Otherwise (when it's not `npm link`ed), use this
  Reader = require('protobufjs').Reader
}

/**
 * Transforms a stream of bytes to protobuf messages
 */
class ProtobufMessageStream extends Stream.Transform {
  constructor(type) {
    super({objectMode: true})
    this._type = type
    this._buffer = Buffer.alloc(0)
  }

  _transform(chunk, _, cb) {
    this._buffer = Buffer.concat([this._buffer, chunk])
    this._reader = Reader.create(this._buffer)

    try {
      while (this._reader.pos < this._reader.len) {
        const message = this._type.decodeDelimited(this._reader)
        this._buffer = this._buffer.slice(this._reader.pos)
        this.push(message)
      }
    } catch (err) {
      // wait for more
    }
    cb()
  }
}

module.exports = ProtobufMessageStream