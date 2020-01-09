import { Transform, TransformCallback } from 'stream'

/**
 * Transforms an NDJSON stream to a stream of message objects
 */
export default class NdjsonToMessageStream<T> extends Transform {
  private buffer: string

  constructor(private readonly fromObject: (object: any) => T) {
    super({ objectMode: true })
  }

  public _transform(
    chunk: string,
    encoding: string,
    callback: TransformCallback
  ) {
    if (this.buffer === undefined) {
      this.buffer = ''
    }
    this.buffer += chunk
    const lines = this.buffer.split('\n')
    this.buffer = lines.pop()
    for (const line of lines) {
      this.push(this.fromObject(JSON.parse(line)))
    }
    callback()
  }

  public _flush(callback: TransformCallback): void {
    if (this.buffer) {
      this.push(this.fromObject(JSON.parse(this.buffer)))
    }
    callback()
  }
}
