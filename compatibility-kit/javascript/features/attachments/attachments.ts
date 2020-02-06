import { Before, When } from '@cucumber/fake-cucumber'
import { ReadableStreamBuffer } from 'stream-buffers'
import fs from 'fs'

// Cucumber-JVM needs to use a Before hook in order to create attachments
Before(() => undefined)

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

When('a JPEG image is attached', async function() {
  await this.attach(
    fs.createReadStream(__dirname + '/cucumber-growing-on-vine.jpg'),
    'image/jpg'
  )
})
