import { Transform, TransformCallback } from 'stream'
import { Reader } from 'protobufjs'

/**
 * Transforms a binary stream to a stream of message objects
 */
export default class BinaryToMessageStream<T> extends Transform {
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
        if (err instanceof RangeError) {
          // The buffer doesn't have all the data yet. Keep reading.
          break
        } else {
          throw err
        }
      }
    }
    callback()
  }
}
