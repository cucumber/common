import assert from 'assert'
import { messages } from '@cucumber/messages'
import Search from '../../src/search/Search'
import { makeFeature, makeScenario, makeStep } from './utils'

describe('Search', () => {
  let search: Search
  let gherkinDocuments: messages.IGherkinDocument[]

  beforeEach(() => {
    gherkinDocuments = [
      messages.GherkinDocument.create({
        uri: 'some/feature.file',
        feature: makeFeature('Continents', 'The world is divided in continents', [
          makeScenario('Europe', 'The old continent', [
            makeStep('Given', 'France'),
            makeStep('When', 'Spain'),
            makeStep('Then', 'The Netherlands'),
          ]),
          makeScenario('America', 'The new continent', [
            makeStep('When', 'Mexico'),
            makeStep('Then', 'Brazil'),
          ]),
        ]),
      }),
    ]

    search = new Search()
    for (const gherkinDocument of gherkinDocuments) {
      search.add(gherkinDocument)
    }
  })

  context('Hit found in step', () => {
    it('displays just one scenario', () => {
      const searchResults = search.search('Spain')

      assert.deepStrictEqual(searchResults, [])
    })
  })
})


