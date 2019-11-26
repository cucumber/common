import { Transform, TransformCallback } from 'stream'

/**
 * Transforms a stream of message objects to binary
 */
export default class MessageToBinaryStream<T> extends Transform {
  constructor() {
    super({ objectMode: true })
  }

  public _transform(message: T, encoding: string, callback: TransformCallback) {
    // @ts-ignore
    const chunk = message.constructor.encodeDelimited(message).finish()
    this.push(chunk)
    callback()
  }
}
