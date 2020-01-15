import { Transform, TransformCallback } from 'stream'
import { messages } from './index'

/**
 * Transforms a stream of message objects to binary
 */
export default class MessageToBinaryStream extends Transform {
  constructor() {
    super({ objectMode: true })
  }

  public _transform(
    message: messages.Envelope,
    encoding: string,
    callback: TransformCallback
  ) {
    const chunk = messages.Envelope.encodeDelimited(message).finish()
    this.push(chunk)
    callback()
  }
}
