import { messages } from '@cucumber/messages'
import assert from 'assert'
import gherkinDocumentToSource from './gherkinDocumentToSource'

describe('gherkinDocumentToSource', () => {
  it('provides the correct source uri', () => {
    const source = gherkinDocumentToSource(
      messages.GherkinDocument.create({
        uri: 'path/to/file.feature',
      })
    )

    assert.equal(source.uri, 'path/to/file.feature')
  })

  it('provides the correct media type', () => {
    const source = gherkinDocumentToSource(messages.GherkinDocument.create())

    assert.equal(source.mediaType, 'text/x.cucumber.gherkin+plain')
  })

  xit('it produces the Gherkin original document', () => {
    // This may be implemented later on.
    const source = gherkinDocumentToSource(
      messages.GherkinDocument.create({
        feature: messages.GherkinDocument.Feature.create({
          name: 'My feature',
          location: messages.Location.create({ line: 1 }),
        }),
      })
    )

    assert.equal(source.data, 'Feature: My feature\n')
  })
})
