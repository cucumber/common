import assert from 'assert'
import { messages } from '@cucumber/messages'
import Search from '../../src/search/Search'

describe('Search', () => {
  let search: Search
  let gherkinDocuments: messages.IGherkinDocument[]

  beforeEach(() => {
    gherkinDocuments = [
      messages.GherkinDocument.create({
        uri: 'some/feature.file',
        feature: makeFeature(
          'My first feature',
          [
            makeScenario('A passed scenario', [
              makeStep('Given', 'a passed step'),
              makeStep('When', 'a passed step'),
              makeStep('Then', 'a passed step')
            ]),
            makeScenario('A failed scenario', [
              makeStep('Given', 'a passed step'),
              makeStep('When', 'a failed step'),
              makeStep('Then', 'a skipped step')
            ])
          ]
        )
      }),

      messages.GherkinDocument.create({
        uri: 'another/feature.file',
        feature: makeFeature(
          'My second feature',
          [
            makeScenario('A passed scenario', [
              makeStep('Given', 'a passed step'),
              makeStep('When', 'a passed step'),
              makeStep('Then', 'a passed step')
            ]),
            makeScenario('A passed scenario', [
              makeStep('Given', 'a passed step'),
              makeStep('When', 'a passed step'),
              makeStep('Then', 'a passed step')
            ])
          ]
        )
      })
    ]

    search = new Search()
    for (const gherkinDocument of gherkinDocuments) {
      search.add(gherkinDocument)
    }
  })

  context('#search', () => {
    it('returns an empty list when the is no match', () => {
      const searchResults = search.search('whatever')

      assert.deepStrictEqual(searchResults, [])
    })

    context('when the feature name matches', () => {
      it('returns Gherkin documents with the correct URI', () => {
        const searchResults = search.search('My first')

        assert.strictEqual(searchResults[0].uri, 'some/feature.file')
      })

      it('returns a Gherkin document including the feature', () => {
        const searchResults = search.search('My first')

        assert.deepStrictEqual(
          searchResults.map(gherkinDocument => gherkinDocument.feature.name),
          ['My first feature']
        )
      })

      it('does not filter out the scenarios', () => {
        const searchResults = search.search('My first')
        const scenarios = searchResults[0].feature.children.map(child => child.scenario)

        assert.deepStrictEqual(
          scenarios.map(sc => sc.name),
          ['A passed scenario', 'A failed scenario']
        )
      })
    })

    // it('returns a constructed feature with a subset of scenarios which names match the query)
    // it('returns a constructed feature with a subset of scenarios which steps match the query)

    // Does it always show the background ?
  })

  function makeFeature(name: string, scenarios: messages.GherkinDocument.Feature.IScenario[]): messages.GherkinDocument.IFeature {
    return messages.GherkinDocument.Feature.create({
      name: name,
      children: scenarios.map(scenario => messages.GherkinDocument.Feature.FeatureChild.create({scenario: scenario}))
    })
  }

  function makeScenario(name: string, steps: messages.GherkinDocument.Feature.IStep[]): messages.GherkinDocument.Feature.IScenario {
    return messages.GherkinDocument.Feature.Scenario.create({
      name: name,
      steps: steps
    })
  }

  function makeStep(keyword: string, text: string): messages.GherkinDocument.Feature.IStep {
    return messages.GherkinDocument.Feature.Step.create({
      keyword: keyword,
      text: text
    })
  }
})