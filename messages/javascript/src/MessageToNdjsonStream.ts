import { Transform, TransformCallback } from 'stream'

/**
 * Transforms a stream of message objects to NDJSON
 */
export default class MessageToNdjsonStream<T> extends Transform {
  constructor() {
    super({
      writableObjectMode: true,
      readableObjectMode: true,
    })
  }

  public _transform(message: T, encoding: string, callback: TransformCallback) {
    // @ts-ignore
    const object = message.toJSON()

    // This reviver omits printing fields with empty values
    // This is to make it behave the same as Golang's protobuf->JSON converter
    const json = JSON.stringify(object, (key: string, value: any) => {
      return value === '' ? undefined : value
    })
    this.push(json + '\n')
    callback()
  }
}
