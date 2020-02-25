import assert from 'assert'
import { messages } from '@cucumber/messages'
import FeatureSearch from '../../src/search/FeatureSearch'

describe('FeatureSearch', () => {
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

  context('#search', () => {
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
})
