import * as messages from '@cucumber/messages'

export default function gherkinDocumentToSource(
  gherkinDocument: messages.GherkinDocument
): messages.Source {
  return {
    uri: gherkinDocument.uri,
    mediaType: messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN,
    data: '[No source available]',
  }
}
