import * as messages from '@cucumber/messages'

export default function gherkinDocumentToSource(
  gherkinDocument: messages.GherkinDocument
): messages.Source {
  return {
    uri: gherkinDocument.uri,
    media_type: 'text/x.cucumber.gherkin+plain',
  }
}
