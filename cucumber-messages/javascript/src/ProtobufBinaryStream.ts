import { Transform, TransformCallback } from 'stream'
import { Writer } from 'protobufjs'

/**
 * Transforms a stream of protobuf messages to bytes
 */
export default class ProtobufBinaryStream<T> extends Transform {
  constructor(private readonly encodeDelimited: (message: T) => Writer) {
    super({ objectMode: true })
  }

  public _transform(message: T, encoding: string, callback: TransformCallback) {
    const chunk = this.encodeDelimited(message).finish()
    this.push(chunk)
    callback()
  }
}
