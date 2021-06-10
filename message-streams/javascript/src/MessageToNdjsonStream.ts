import { Transform, TransformCallback } from 'stream'
import * as messages from '@cucumber/messages'

/**
 * Transforms a stream of message objects to NDJSON
 */
export default class MessageToNdjsonStream extends Transform {
  constructor() {
    super({ writableObjectMode: true, readableObjectMode: false })
  }

  public _transform(envelope: messages.Envelope, encoding: string, callback: TransformCallback) {
    const json = JSON.stringify(envelope)
    this.push(json + '\n')
    callback()
  }
}
