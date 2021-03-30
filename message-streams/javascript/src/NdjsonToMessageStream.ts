import { Transform, TransformCallback } from 'stream'

/**
 * Transforms an NDJSON stream to a stream of message objects
 */
export default class NdjsonToMessageStream<T> extends Transform {
  private buffer: string

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly fromObject: (object: { [k: string]: any }) => T
  ) {
    super({ writableObjectMode: false, readableObjectMode: true })
  }

  public _transform(chunk: string, encoding: string, callback: TransformCallback): void {
    if (this.buffer === undefined) {
      this.buffer = ''
    }
    this.buffer += Buffer.isBuffer(chunk) ? chunk.toString('utf-8') : chunk
    const lines = this.buffer.split('\n')
    this.buffer = lines.pop()
    for (const line of lines) {
      if (line.trim().length > 0) {
        try {
          const object = JSON.parse(line)
          this.push(this.fromObject(object))
        } catch (err) {
          return callback(new Error(`Not JSON: ${line}`))
        }
      }
    }
    callback()
  }

  public _flush(callback: TransformCallback): void {
    if (this.buffer) {
      try {
        const object = JSON.parse(this.buffer)
        this.push(this.fromObject(object))
      } catch (err) {
        return callback(new Error(`Not JSONs: ${this.buffer}`))
      }
    }
    callback()
  }
}
