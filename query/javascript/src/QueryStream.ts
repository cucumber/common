import { Writable } from 'stream'
import Query from './Query'
import { messages } from '@cucumber/messages'

export default class QueryStream extends Writable {
  constructor(private readonly query: Query) {
    super({ objectMode: true })
  }

  _write(
    envelope: messages.IEnvelope,
    encoding: string,
    callback: (error?: Error | null) => void
  ): void {
    this.query.update(envelope)
    callback(null)
  }
}
