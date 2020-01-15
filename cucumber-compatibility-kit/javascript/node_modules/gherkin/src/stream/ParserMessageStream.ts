import generateMessages from './generateMessages'
import { Transform, TransformCallback } from 'stream'
import { messages } from 'cucumber-messages'
import IGherkinOptions from '../IGherkinOptions'

/**
 * Stream that reads Source messages and writes GherkinDocument and Pickle messages.
 */
export default class ParserMessageStream extends Transform {
  constructor(private readonly options: IGherkinOptions) {
    super({ writableObjectMode: true, readableObjectMode: true })
  }

  public _transform(
    envelope: messages.IEnvelope,
    encoding: string,
    callback: TransformCallback
  ) {
    if (envelope.source) {
      const messageList = generateMessages(
        envelope.source.data,
        envelope.source.uri,
        this.options
      )
      for (const message of messageList) {
        this.push(message)
      }
    }
    callback()
  }
}

module.exports = ParserMessageStream
