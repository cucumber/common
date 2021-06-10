import { Transform, TransformCallback } from 'stream'
import { Query } from '@cucumber/gherkin-utils'
import * as messages from '@cucumber/messages'

export default class GherkinQueryStream extends Transform {
  constructor(private readonly gherkinQuery: Query) {
    super({ readableObjectMode: true, writableObjectMode: true })
  }

  _transform(envelope: messages.Envelope, encoding: string, callback: TransformCallback): void {
    this.gherkinQuery.update(envelope)
    callback(null, envelope)
  }
}
