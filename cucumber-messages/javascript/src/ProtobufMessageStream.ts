import { Transform, TransformCallback } from 'stream'
import { Reader } from 'protobufjs'

/**
 * Transforms a stream of bytes to protobuf messages
 */
class ProtobufMessageStream<T> extends Transform {
  private buffer = Buffer.alloc(0)

  constructor(private readonly decodeDelimited: (reader: Reader|Uint8Array) => T) {
    super({objectMode: true})
  }

  _transform(chunk: any, encoding: string, callback: TransformCallback) {
    this.buffer = Buffer.concat([this.buffer, chunk])
    const reader = Reader.create(this.buffer)

    try {
      const {len, pos} = reader
      while (pos < len) {
        const message = this.decodeDelimited(reader)
        if(!message) {
          return callback(new Error(`No message returned. len=${len}, pos=${pos}`))
        }
        this.buffer = this.buffer.slice(reader.pos)
        this.push(message)
      }
    } catch (err) {
      // wait for more
    }
    callback()
  }
}

export default ProtobufMessageStream
