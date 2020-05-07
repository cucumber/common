import { pipeline, Stream } from 'stream'
import { promisify } from 'util'
import assert from 'assert'
import JSONTransformStream from '../../src/stream/JSONTransformStream'
import SingleObjectWritableStream from '../../src/stream/SingleObjectWritableStream'
const asyncPipeline = promisify(pipeline)

describe('JSONReportStream', () => {
  it('transforms a readable stream to a JSON report', async () => {
    const data = [{}, {}, {}]

    const readableStream = new Stream.Readable({
      read() {
        this.push(JSON.stringify(data))
        this.push(null)
      },
    })
    const sink = new SingleObjectWritableStream<Array<any>>()
    await asyncPipeline(readableStream, new JSONTransformStream(), sink)
    assert.deepStrictEqual(sink.object, data)
  })

  it('handles non-json data gracefully', async () => {
    const data = '# this is not json'

    const readableStream = new Stream.Readable({
      read() {
        this.push(data)
        this.push(null)
      },
    })
    const sink = new SingleObjectWritableStream<Array<any>>()
    let f = (): null => null
    try {
      await asyncPipeline(readableStream, new JSONTransformStream(), sink)
    } catch (e) {
      f = () => {
        throw e
      }
    } finally {
      assert.throws(f, /SyntaxError.+JSON/)
    }
  })
})
