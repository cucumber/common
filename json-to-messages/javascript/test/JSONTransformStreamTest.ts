import { pipeline, Readable } from 'stream'
import { promisify } from 'util'
import assert from 'assert'
import JSONTransformStream from '../src/JSONTransformStream'
import SingleObjectWritable from '../src/SingleObjectWritable'
const asyncPipeline = promisify(pipeline)

describe('JSONReportStream', () => {
  it('transforms a readable stream to a JSON report', async () => {
    const data = [{}, {}, {}]
    const jsonChunks = JSON.stringify(data).split('')
    const readableStream = Readable.from(jsonChunks)
    const sink = new SingleObjectWritable<Array<any>>()
    await asyncPipeline(readableStream, new JSONTransformStream(), sink)
    assert.deepStrictEqual(sink.object, data)
  })
})
