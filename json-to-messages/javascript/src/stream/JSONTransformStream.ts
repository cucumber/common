import { Transform, TransformCallback } from 'stream'

export default class JSONTransformStream extends Transform {
  private readonly stringChunks: string[] = []

  constructor() {
    super({ readableObjectMode: true })
  }

  _transform(chunk: string | Buffer, encoding: string, callback: TransformCallback): void {
    const stringChunk = Buffer.isBuffer(chunk) ? chunk.toString('utf-8') : chunk
    this.stringChunks.push(stringChunk)
    callback()
  }

  _flush(callback: TransformCallback): void {
    try {
      this.push(JSON.parse(this.stringChunks.join('')))
      callback()
    } catch (err) {
      callback(err)
    }
  }
}
