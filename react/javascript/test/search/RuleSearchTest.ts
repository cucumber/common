import assert from 'assert'
import { messages } from '@cucumber/messages'
import RuleSearch from '../../src/search/RuleSearch'
import { makeRule } from './utils'

describe('RuleSearch', () => {
  let ruleSearch: RuleSearch
  let rules: messages.GherkinDocument.Feature.FeatureChild.IRule[]

  beforeEach(() => {
    ruleSearch = new RuleSearch()

    rules = [
      makeRule('first rule', 'a little description', []),
      makeRule('second rule', 'a long description', []),
      makeRule('third rule', 'description', []),
    ]

    for (const rule of rules) {
      ruleSearch.add(rule)
    }
  })

  context('#search', () => {
    it('returns an empty list when there is no hits', () => {
      const searchResults = ruleSearch.search('no match there')
      assert.deepStrictEqual(searchResults, [])
    })

    it('returns rule which name match the query', () => {
      const searchResults = ruleSearch.search('second')
      assert.deepStrictEqual(searchResults, [rules[1]])
    })

    it('returns rule which name match the query in description', () => {
      const searchResults = ruleSearch.search('little')
      assert.deepStrictEqual(searchResults, [rules[0]])
    })
  })
})
