import assert from 'assert'
import * as messages from '@cucumber/messages'
import FeatureSearch from '../../src/search/FeatureSearch'
import { makeFeature } from './utils'

describe('FeatureSearch', () => {
  let featureSearch: FeatureSearch
  let gherkinDocument: messages.GherkinDocument

  beforeEach(() => {
    featureSearch = new FeatureSearch()
    gherkinDocument = {
      uri: 'some/feature.file',
      comments: [],
      feature: makeFeature('this exists', 'description feature', []),
    }

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

    it('finds results with equal feature description', () => {
      const searchResult = featureSearch.search('description')

      assert.deepStrictEqual(searchResult, [gherkinDocument.feature])
    })
  })
})
