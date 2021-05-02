import * as messages from '@cucumber/messages'

export default function gherkinDocumentToSource(
  gherkinDocument: messages.GherkinDocument
): messages.Source {
  return {
    uri: gherkinDocument.uri,
    mediaType: 'text/x.cucumber.gherkin+plain',
    data: '[No source available]',
  }
}
