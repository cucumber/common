import { messages } from '@cucumber/messages'
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
    const attachment = new messages.Attachment({
      testStepId,
      testCaseStartedId,
      mediaType,
    })

    if (typeof data === 'string') {
      attachment.body = data
      attachment.contentEncoding = messages.Attachment.ContentEncoding.IDENTITY
      listener(
        new messages.Envelope({
          attachment,
        })
      )
    } else if (Buffer.isBuffer(data)) {
      attachment.body = (data as Buffer).toString('base64')
      attachment.contentEncoding = messages.Attachment.ContentEncoding.BASE64
      listener(
        new messages.Envelope({
          attachment,
        })
      )
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
          attachment.body = buf.toString('base64')
          attachment.contentEncoding =
            messages.Attachment.ContentEncoding.BASE64
          listener(
            new messages.Envelope({
              attachment,
            })
          )
          resolve()
        })
        stream.on('error', reject)
      })
    } else {
      throw new Error(`data must be string, Buffer or Readable`)
    }
  }
}
