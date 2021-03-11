import { Transform, TransformCallback } from 'stream'
import { Reader } from 'protobufjs'

/**
 * Transforms a binary stream to a stream of message objects
 */
export default class BinaryToMessageStream<T> extends Transform {
  private buffer = Buffer.alloc(0)

  constructor(private readonly decodeDelimited: (reader: Reader | Uint8Array) => T) {
    super({ writableObjectMode: false, readableObjectMode: true })
  }

  public _transform(chunk: Buffer, encoding: string, callback: TransformCallback): void {
    this.buffer = Buffer.concat([this.buffer, chunk])
    let finished = false
    do {
      try {
        const reader = Reader.create(this.buffer)
        const message = this.decodeDelimited(reader)
        this.push(message)
        this.buffer = this.buffer.slice(reader.pos)
        finished = true
      } catch (err) {
        if (err instanceof RangeError) {
          // The buffer doesn't have all the data yet. Keep reading.
          break
        } else {
          throw err
        }
      }
    } while (!finished)
    callback()
  }
}
