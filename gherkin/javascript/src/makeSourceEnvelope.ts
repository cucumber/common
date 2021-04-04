import { messages } from '@cucumber/messages'
import GherkinMediaType from './GherkinMediaType'

export default function makeSourceEnvelope(data: string, uri: string): messages.IEnvelope {
  let mediaType: GherkinMediaType
  if (uri.endsWith('.feature')) {
    mediaType = GherkinMediaType.PLAIN
  } else if (uri.endsWith('.md')) {
    mediaType = GherkinMediaType.MARKDOWN
  }
  if (!mediaType) throw new Error(`The uri (${uri}) must end with .feature or .md`)

  return new messages.Envelope({
    source: new messages.Source({
      data,
      uri,
      mediaType,
    }),
  })
}
