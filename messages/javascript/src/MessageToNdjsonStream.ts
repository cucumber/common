import { Transform, TransformCallback } from 'stream'
import { messages } from './index'

/**
 * Transforms a stream of message objects to NDJSON
 */
export default class MessageToNdjsonStream extends Transform {
  constructor() {
    super({ writableObjectMode: true, readableObjectMode: false })
  }

  public _transform(
    message: messages.Envelope,
    encoding: string,
    callback: TransformCallback
  ) {
    const object = message.toJSON()

    // This reviver omits printing fields with empty values
    // This is to make it behave the same as Golang's protobuf->JSON converter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json = JSON.stringify(object, (key: string, value: any) => {
      return value === '' ? undefined : value
    })
    this.push(json + '\n')
    callback()
  }
}
