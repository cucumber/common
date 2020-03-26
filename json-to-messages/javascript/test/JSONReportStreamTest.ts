import { pipeline, Readable, Writable } from 'stream'
import { promisify } from 'util'
import assert from 'assert'
import JSONReportStream from '../src/JSONReportStream'
const asyncPipeline = promisify(pipeline)

describe('JSONReportStream', () => {
  it('transforms a readable stream to a JSON report', async () => {
    const data = [{}, {}, {}]
    const jsonChunks = JSON.stringify(data).split('')
    const readableStream = Readable.from(jsonChunks)
    const sink = new Sink()
    await asyncPipeline(readableStream, new JSONReportStream(), sink)
    assert.deepStrictEqual(sink.objectChunks[0], data)
  })
})

class Sink extends Writable {
  public readonly objectChunks: any[] = []
  constructor() {
    super({ objectMode: true })
  }

  _write(
    chunk: any,
    encoding: string,
    callback: (error?: Error | null) => void
  ): void {
    this.objectChunks.push(chunk)
    callback()
  }
}
