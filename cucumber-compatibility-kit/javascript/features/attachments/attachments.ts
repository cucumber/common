import { When } from 'fake-cucumber'
import { ReadableStreamBuffer } from 'stream-buffers'

When('the string {string} is attached as {string}', function(
  text: string,
  mediaType: string
) {
  this.attach(text, mediaType)
})

When('an array with {int} bytes are attached as {string}', function(
  size: number,
  mediaType: string
) {
  const data = [...Array(size).keys()]
  const buffer = Buffer.from(data)
  this.attach(buffer, mediaType)
})

When('a stream with {int} bytes are attached as {string}', async function(
  size: number,
  mediaType: string
) {
  const data = [...Array(size).keys()]
  const buffer = Buffer.from(data)
  const stream = new ReadableStreamBuffer({ chunkSize: 1, frequency: 1 })
  stream.put(buffer)
  stream.stop()

  await this.attach(stream, mediaType)
})
