import { Transform, TransformCallback } from 'stream'
import { Reader } from 'protobufjs'

/**
 * Transforms a stream of bytes to protobuf messages
 */
class ProtobufMessageStream<T> extends Transform {
  private buffer = Buffer.alloc(0)

  constructor(
    private readonly decodeDelimited: (reader: Reader | Uint8Array) => T
  ) {
    super({ objectMode: true })
  }

  public _transform(chunk: any, encoding: string, callback: TransformCallback) {
    this.buffer = Buffer.concat([this.buffer, chunk])

    while (true) {
      try {
        const reader = Reader.create(this.buffer)
        const message = this.decodeDelimited(reader)
        this.push(message)
        this.buffer = this.buffer.slice(reader.pos)
      } catch (err) {
        break
      }
    }
    callback()
  }
}

export default ProtobufMessageStream
