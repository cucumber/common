import { Transform } from 'stream'
import {
  MessageToBinaryStream,
  MessageToNdjsonStream,
} from '@cucumber/messages'

export default function makeFormatStream(
  format: 'ndjson' | 'protobuf'
): Transform {
  switch (format) {
    case 'ndjson':
      return new MessageToNdjsonStream()
    case 'protobuf':
      return new MessageToBinaryStream()
    default:
      throw new Error(`Unsupported format: '${format}'`)
  }
}
