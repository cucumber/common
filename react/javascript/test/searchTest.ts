import assert from 'assert'
import { messages } from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableFeature {
  uri: string
  name: string
}

class FeatureSearch {
  private readonly featuresByUri = new Map<
    string,
    messages.GherkinDocument.IFeature
  >()
  private readonly index = elasticlunr<SearchableFeature>(ctx => {
    ctx.setRef('uri')
    ctx.addField('name')
    ctx.saveDocument(true)
  })

  public add(gherkinDocument: messages.IGherkinDocument) {
    this.featuresByUri.set(gherkinDocument.uri, gherkinDocument.feature)

    this.index.addDoc({
      uri: gherkinDocument.uri,
      name: gherkinDocument.feature.name,
    })
  }

  public search(query: string): messages.GherkinDocument.IFeature[] {
    const searchResultsList = this.index.search(query, {
      fields: {
        name: { boost: 1 },
      },
    })

    return searchResultsList.map(searchResults => {
      return this.featuresByUri.get(searchResults.ref)
    })
  }
}

describe('search', () => {
  let featureSearch: FeatureSearch
  let gherkinDocument: messages.IGherkinDocument

  beforeEach(() => {
    featureSearch = new FeatureSearch()
    gherkinDocument = messages.GherkinDocument.create({
      uri: 'some/feature.file',
      feature: messages.GherkinDocument.Feature.create({
        name: 'this exists',
      }),
    })

    featureSearch.add(gherkinDocument)
  })

  it('returns an empty array when there are no hits', () => {
    const searchResult = featureSearch.search('banana')

    assert.deepStrictEqual(searchResult, [])
  })

  it('finds results with equal feature name', () => {
    const searchResult = featureSearch.search('this exists')

    assert.deepStrictEqual(searchResult, [gherkinDocument.feature])
  })

  it('finds results with substring of feature name', () => {
    const searchResult = featureSearch.search('exists')

    assert.deepStrictEqual(searchResult, [gherkinDocument.feature])
  })
})
