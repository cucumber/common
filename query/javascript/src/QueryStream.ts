import { Transform, TransformCallback } from 'stream'
import Query from './Query'
import { messages } from '@cucumber/messages'

export default class QueryStream extends Transform {
  constructor(private readonly query: Query) {
    super({ readableObjectMode: true, writableObjectMode: true })
  }

  _transform(
    envelope: messages.IEnvelope,
    encoding: string,
    callback: TransformCallback
  ): void {
    console.error(Object.keys(envelope)[0])
    this.query.update(envelope)
    console.error('ok')
    callback(null, envelope)
  }
}
