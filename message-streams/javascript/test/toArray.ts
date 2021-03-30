import { Readable } from 'stream'
import { messages } from '@cucumber/messages'

export default function toArray(input: Readable): Promise<messages.IEnvelope[]> {
  return new Promise((resolve, reject) => {
    const result: messages.IEnvelope[] = []
    input.on('data', (wrapper: messages.IEnvelope) => result.push(wrapper))
    input.on('end', () => resolve(result))
    input.on('error', (err: Error) => reject(err))
  })
}
