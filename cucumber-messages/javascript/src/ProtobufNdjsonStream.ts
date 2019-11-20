import { Transform, TransformCallback } from 'stream'

export default class ProtobufNdjsonStream<T> extends Transform {
  constructor() {
    super({
      writableObjectMode: true,
      readableObjectMode: true,
    })
  }

  public _transform(message: T, encoding: string, callback: TransformCallback) {
    // @ts-ignore
    if (!message.constructor.toObject) {
      return callback(
        new Error(`Not a protobuf object: ${JSON.stringify(message)}`)
      )
    }
    // @ts-ignore
    const ob = message.constructor.toObject(message, {
      defaults: false,
      enums: String,
      arrays: false,
      objects: false,
    })

    // This reviver omits printing fields with empty values
    // This is to make it behave the same as Golang's protobuf->JSON converter
    const json = JSON.stringify(ob, (key: string, value: any) => {
      return value === '' ? undefined : value
    })
    this.push(json + '\n')
    callback()
  }
}
