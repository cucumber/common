import { messages } from 'cucumber-messages'

export default function makeSourceEnvelope(
  data: string,
  uri: string
): messages.IEnvelope {
  return new messages.Envelope({
    source: new messages.Source({
      data,
      uri,
      media: new messages.Media({
        encoding: messages.Media.Encoding.UTF8,
        contentType: 'text/x.cucumber.gherkin+plain',
      }),
    }),
  })
}
