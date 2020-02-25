import assert from 'assert'
import { messages } from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableFeature {
  uri: string
  name: string
}

function search(
  gherkinDocuments: messages.IGherkinDocument[],
  query: string
): messages.GherkinDocument.IFeature[] {
  const featuresByUri = new Map<string, messages.GherkinDocument.IFeature>()

  const index = elasticlunr<SearchableFeature>(ctx => {
    ctx.setRef('uri')
    ctx.addField('name')
    ctx.saveDocument(true)
  })

  for (const gherkinDocument of gherkinDocuments) {
    featuresByUri.set(gherkinDocument.uri, gherkinDocument.feature)

    index.addDoc({
      uri: gherkinDocument.uri,
      name: gherkinDocument.feature.name,
    })
  }
  const searchResultsList = index.search(query, {
    fields: {
      name: {},
    },
  })

  return searchResultsList.map(searcResults => featuresByUri.get(searcResults.ref))
}

describe('search', () => {
  let gherkinDocument: messages.IGherkinDocument

  beforeEach(() => {
    gherkinDocument = messages.GherkinDocument.create({
      uri: 'some/feature.file',
      feature: messages.GherkinDocument.Feature.create({
        name: 'this exists',
      }),
    })
  })

  it('returns an empty array when there are no hits', () => {
    const searchResult = search([], 'banana')

    assert.deepStrictEqual(searchResult, [])
  })

  it('finds results with equal feature name', () => {
    const searchResult = search([gherkinDocument], 'this exists')

    assert.deepStrictEqual(searchResult, [gherkinDocument.feature])
  })

  it('finds results with substring of feature name', () => {
    const searchResult = search([gherkinDocument], 'exists')

    assert.deepStrictEqual(searchResult, [gherkinDocument.feature])
  })

  xit('finds results with substring of feature name with typo', () => {
    const searchResult = search([gherkinDocument], 'exits')

    assert.deepStrictEqual(searchResult, [gherkinDocument.feature])
  })
})
