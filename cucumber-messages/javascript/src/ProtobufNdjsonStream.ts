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
    const ob = message.constructor.toObject(message, { defaults: true })

    // This reviver omits printing fields with empty values
    // This is to make it behave the same as Golang's protobuf->JSON converter
    const json = JSON.stringify(ob, (key: string, value: any) => {
      return value === null ||
        value === '' ||
        value === 0 ||
        (Array.isArray(value) && value.length === 0)
        ? undefined
        : fixEnum(key, value)
    })
    this.push(json + '\n')
    callback()
  }
}

// Enum values are incorrectly represented in JSON as the enum value index,
// rather than the enum value string. This function works around that.
function fixEnum(key: string, value: any) {
  if (key === 'encoding') {
    return ['BASE64', 'UTF8'][value]
  }
  return value
}
