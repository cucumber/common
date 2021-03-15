import { EventEmitter } from 'events'
import { Readable } from 'stream'
import { Attach, EnvelopeListener } from './types'

export default function makeAttach(
  testStepId: string,
  testCaseStartedId: string,
  listener: EnvelopeListener
): Attach {
  return function attach(
    data: string | Buffer | Readable,
    mediaType: string
  ): void | Promise<void> {
    let body: string
    let contentEncoding: 'IDENTITY' | 'BASE64'

    if (typeof data === 'string') {
      body = data
      contentEncoding = 'IDENTITY'
      listener({
        attachment: {
          testStepId,
          testCaseStartedId,
          mediaType,
          body,
          contentEncoding,
        },
      })
    } else if (Buffer.isBuffer(data)) {
      body = (data as Buffer).toString('base64')
      contentEncoding = 'BASE64'
      listener({
        attachment: {
          testStepId,
          testCaseStartedId,
          mediaType,
          body,
          contentEncoding,
        },
      })
    } else if (
      data instanceof EventEmitter &&
      // @ts-ignore
      typeof data.read === 'function'
    ) {
      // @ts-ignore
      const stream: Readable = data

      return new Promise((resolve, reject) => {
        let buf = Buffer.alloc(0)
        stream.on('data', (chunk: Buffer | string) => {
          if (!Buffer.isBuffer(chunk)) {
            stream.destroy(new Error(`Can only attach binary streams`))
            return
          }
          buf = Buffer.concat([buf, chunk])
        })
        stream.on('end', () => {
          body = buf.toString('base64')
          contentEncoding = 'BASE64'
          listener({
            attachment: {
              testStepId,
              testCaseStartedId,
              mediaType,
              body,
              contentEncoding,
            },
          })
          resolve()
        })
        stream.on('error', reject)
      })
    } else {
      throw new Error(`data must be string, Buffer or Readable`)
    }
  }
}
