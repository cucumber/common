import { messages } from '@cucumber/messages'
import { GHERKIN_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE } from './generateMessages'

export default function makeSourceEnvelope(
  data: string,
  uri: string
): messages.IEnvelope {
  return new messages.Envelope({
    source: new messages.Source({
      data,
      uri,
      mediaType: uri.endsWith('.feature')
        ? GHERKIN_MEDIA_TYPE
        : MARKDOWN_MEDIA_TYPE,
    }),
  })
}
