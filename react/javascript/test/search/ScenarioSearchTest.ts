import assert from 'assert'
import { messages } from '@cucumber/messages'
import ScenarioSearch from '../../src/search/ScenarioSearch'
import { makeScenario } from './utils'

describe('ScenarioSearch', () => {
  let scenarioSearch: ScenarioSearch
  let scenarios: messages.GherkinDocument.Feature.IScenario[]

  beforeEach(() => {
    scenarioSearch = new ScenarioSearch()

    scenarios = [
      makeScenario('a passed scenario', 'a little description', []),
      makeScenario(
        'another passed scenario',
        'a long description of the scenario',
        []
      ),
      makeScenario('a failed scenario', 'description', []),
    ]

    for (const scenario of scenarios) {
      scenarioSearch.add(scenario)
    }
  })

  context('#search', () => {
    it('returns an empty list when there is no hits', () => {
      const searchResults = scenarioSearch.search('no match there')
      assert.deepStrictEqual(searchResults, [])
    })

    it('returns scenario which name match the query', () => {
      const searchResults = scenarioSearch.search('failed')
      assert.deepStrictEqual(searchResults, [scenarios[2]])
    })

    it('may not return results in the original order', () => {
      const searchResults = scenarioSearch.search('scenario')

      for (const scenario of scenarios) {
        assert.ok(searchResults.includes(scenario))
      }
    })

    it('returns scenario which description match the query', () => {
      const searchResults = scenarioSearch.search('little')
      assert.deepStrictEqual(searchResults, [scenarios[0]])
    })
  })
})
