import { Transform, TransformCallback } from 'stream'
import { messages } from '@cucumber/messages'

/**
 * Transforms a stream of message objects to binary
 */
export default class MessageToBinaryStream extends Transform {
  constructor() {
    super({ writableObjectMode: true, readableObjectMode: false })
  }

  public _transform(message: messages.Envelope, encoding: string, callback: TransformCallback) {
    const chunk = messages.Envelope.encodeDelimited(message).finish()
    this.push(chunk)
    callback()
  }
}
