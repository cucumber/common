import * as messages from '@cucumber/messages'

export default function makeSourceEnvelope(data: string, uri: string): messages.Envelope {
  return {
    source: {
      data,
      uri,
      mediaType: 'text/x.cucumber.gherkin+plain',
    },
  }
}
