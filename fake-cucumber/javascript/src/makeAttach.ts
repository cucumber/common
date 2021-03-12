import * as messages from '@cucumber/messages'
import { EventEmitter } from 'events'
import { Readable } from 'stream'
import { Attach, EnvelopeListener } from './types'

export default function makeAttach(
  test_step_id: string,
  test_case_started_id: string,
  listener: EnvelopeListener
): Attach {
  return function attach(
    data: string | Buffer | Readable,
    media_type: string
  ): void | Promise<void> {
    const attachment: messages.Attachment = {
      test_step_id,
      test_case_started_id,
      media_type,
    }

    if (typeof data === 'string') {
      attachment.body = data
      attachment.content_encoding = 'IDENTITY'
      listener({
        attachment,
      })
    } else if (Buffer.isBuffer(data)) {
      attachment.body = (data as Buffer).toString('base64')
      attachment.content_encoding = 'BASE64'
      listener({
        attachment,
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
          attachment.body = buf.toString('base64')
          attachment.content_encoding = 'BASE64'
          listener({
            attachment,
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
