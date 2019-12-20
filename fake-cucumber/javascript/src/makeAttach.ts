import { messages } from 'cucumber-messages'
import { EventEmitter } from 'events'
import { Readable } from 'stream'
import { Attach, MessageNotifier } from './types'

export default function makeAttach(
  testStepId: string,
  testCaseStartedId: string,
  notifier: MessageNotifier
): Attach {
  return function attach(data: any, mediaType: string): void | Promise<void> {
    const attachment = new messages.Attachment({
      testStepId,
      testCaseStartedId,
      mediaType,
    })

    if (typeof data === 'string') {
      attachment.text = data
      notifier(
        new messages.Envelope({
          attachment,
        })
      )
    } else if (Buffer.isBuffer(data)) {
      attachment.binary = data
      notifier(
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
        stream.on('data', (chunk: Buffer) => {
          buf = Buffer.concat([buf, chunk])
        })
        stream.on('end', () => {
          attachment.binary = buf
          notifier(
            new messages.Envelope({
              attachment,
            })
          )
          resolve()
        })
        stream.on('error', reject)
      })
    } else {
      throw new Error(`data must be string or Buffer`)
    }
  }
}
