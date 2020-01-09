import { Transform } from 'stream'
import {
  messages,
  MessageToBinaryStream,
  MessageToNdjsonStream,
} from '@cucumber/messages'

export default function formatStream(format: 'ndjson' | 'protobuf'): Transform {
  switch (format) {
    case 'ndjson':
      return new MessageToNdjsonStream<messages.IEnvelope>()
    case 'protobuf':
      return new MessageToBinaryStream<messages.IEnvelope>()
    default:
      throw new Error(`Unsupported format: '${format}'`)
  }
}
