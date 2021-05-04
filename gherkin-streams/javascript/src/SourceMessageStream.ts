import { makeSourceEnvelope } from '@cucumber/gherkin'
import { Transform, TransformCallback } from 'stream'
import { relative } from 'path'

/**
 * Stream that reads a string and writes a single Source message.
 */
export default class SourceMessageStream extends Transform {
  private buffer = Buffer.alloc(0)

  constructor(private readonly uri: string, private readonly relativeTo?: string) {
    super({ readableObjectMode: true, writableObjectMode: false })
  }

  public _transform(chunk: Buffer, encoding: string, callback: TransformCallback) {
    this.buffer = Buffer.concat([this.buffer, chunk])
    callback()
  }

  public _flush(callback: TransformCallback) {
    const data = this.buffer.toString('utf8')
    const chunk = makeSourceEnvelope(
      data,
      this.relativeTo ? relative(this.relativeTo, this.uri) : this.uri
    )
    this.push(chunk)
    callback()
  }
}
