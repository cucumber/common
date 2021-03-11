import { Writable } from 'stream'
import { Query } from '@cucumber/query'
import * as messages from '@cucumber/messages'

export default class QueryStream extends Writable {
  constructor(private readonly query: Query) {
    super({ objectMode: true })
  }

  _write(
    envelope: messages.Envelope,
    encoding: string,
    callback: (error?: Error | null) => void
  ): void {
    this.query.update(envelope)
    callback(null)
  }
}
