import assert from 'assert'
import { messages } from '@cucumber/messages'
import StepSearch from '../../src/search/StepSearch'
import { makeStep } from './utils'

describe('StepSearch', () => {
  let stepSearch: StepSearch
  let steps: messages.GherkinDocument.Feature.IStep[]

  beforeEach(() => {
    stepSearch = new StepSearch()

    steps = [
      makeStep('Given', 'a passed step'),
      makeStep('When', 'another passed step'),
      makeStep('Then', 'a failed step'),
    ]

    for (const step of steps) {
      stepSearch.add(step)
    }
  })

  context('#search', () => {
    it('returns an empty list when there is no hits', () => {
      const searchResults = stepSearch.search('no match there')
      assert.deepStrictEqual(searchResults, [])
    })

    it('returns step which text match the query', () => {
      const searchResults = stepSearch.search('failed')
      assert.deepStrictEqual(searchResults, [steps[2]])
    })

    it('may not return results in the original order', () => {
      const searchResults = stepSearch.search('step')

      for (const step of steps) {
        assert.ok(searchResults.includes(step))
      }
    })

    it('returns step which keyword match the query', () => {
      const searchResults = stepSearch.search('Given')
      assert.deepStrictEqual(searchResults, [steps[0]])
    })

    xit('it does not exclude "Then" and "When" from indexing', () => {
      // By default, ElasticLurn exclude some words from indexing/searching,
      // amongst them are 'Then' and 'When'.
      // See: http://elasticlunr.com/docs/stop_word_filter.js.html#resetStopWords
    })
  })
})