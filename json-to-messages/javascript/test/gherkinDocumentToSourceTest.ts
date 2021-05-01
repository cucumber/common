import assert from 'assert'
import gherkinDocumentToSource from './gherkinDocumentToSource'

describe('gherkinDocumentToSource', () => {
  it('provides the correct source uri', () => {
    const source = gherkinDocumentToSource({
      uri: 'path/to/file.feature',
      comments: [],
    })

    assert.strictEqual(source.uri, 'path/to/file.feature')
  })

  it('provides the correct media type', () => {
    const source = gherkinDocumentToSource({
      uri: 'path/to/file.feature',
      comments: [],
    })

    assert.strictEqual(source.mediaType, 'text/x.cucumber.gherkin+plain')
  })

  xit('it produces the Gherkin original document', () => {
    // This may be implemented later on.
    const source = gherkinDocumentToSource({
      feature: {
        name: 'My feature',
        location: { line: 1 },
        keyword: 'Feature',
        language: 'en',
        children: [],
        tags: [],
        description: '',
      },
      comments: [],
    })

    assert.strictEqual(source.data, 'Feature: My feature\n')
  })
})
