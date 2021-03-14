import assert from 'assert'
import gherkinDocumentToSource from './gherkinDocumentToSource'

describe('gherkinDocumentToSource', () => {
  it('provides the correct source uri', () => {
    const source = gherkinDocumentToSource({
      uri: 'path/to/file.feature',
    })

    assert.strictEqual(source.uri, 'path/to/file.feature')
  })

  it('provides the correct media type', () => {
    const source = gherkinDocumentToSource({})

    assert.strictEqual(source.mediaType, 'text/x.cucumber.gherkin+plain')
  })

  xit('it produces the Gherkin original document', () => {
    // This may be implemented later on.
    const source = gherkinDocumentToSource({
      feature: {
        name: 'My feature',
        location: { line: 1 },
      },
    })

    assert.strictEqual(source.data, 'Feature: My feature\n')
  })
})
