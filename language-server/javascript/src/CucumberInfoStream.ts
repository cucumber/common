import { Transform, TransformCallback } from 'stream'
import { Envelope } from '@cucumber/messages'
import { CucumberInfoBuilder } from '@cucumber/language-service'

export class CucumberInfoStream extends Transform {
  private readonly builder = new CucumberInfoBuilder()

  constructor() {
    super({ objectMode: true })
  }

  _transform(envelope: Envelope, _: BufferEncoding, callback: TransformCallback) {
    this.builder.processEnvelope(envelope)
    callback()
  }

  _flush(callback: TransformCallback) {
    const cucumberInfo = this.builder.build()
    callback(null, cucumberInfo)
  }
}
