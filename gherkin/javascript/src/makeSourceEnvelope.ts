import GherkinMediaType from './GherkinMediaType'

import * as messages from '@cucumber/messages'

export default function makeSourceEnvelope(data: string, uri: string): messages.Envelope {
  let mediaType: GherkinMediaType
  if (uri.endsWith('.feature')) {
    mediaType = GherkinMediaType.PLAIN
  } else if (uri.endsWith('.md')) {
    mediaType = GherkinMediaType.MARKDOWN
  }
  if (!mediaType) throw new Error(`The uri (${uri}) must end with .feature or .md`)
  return {
    source: {
      data,
      uri,
      mediaType: 'text/x.cucumber.gherkin+plain',
    },
  }
}
