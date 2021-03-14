import assert from 'assert'

import { IdGenerator } from '@cucumber/messages'
import { generateMessages } from '@cucumber/gherkin'
import Search from '../../src/search/Search'
import { pretty, Query as GherkinQuery } from '@cucumber/gherkin-utils'

describe('Search', () => {
  let search: Search
  let gherkinQuery: GherkinQuery

  const feature = `Feature: Solar System

  @planet
  Scenario: Earth
    Given is the sixth planet from the Sun

  @dwarf
  Scenario: Pluto
    Given it is not really a planet
`

  beforeEach(() => {
    gherkinQuery = new GherkinQuery()
    search = new Search(gherkinQuery)
  })

  function prettyResults(feature: string, query: string): string {
    const envelopes = generateMessages(feature, 'test.feature', {
      includeGherkinDocument: true,
      includePickles: true,
      includeSource: true,
      newId: IdGenerator.incrementing(),
    })
    for (const envelope of envelopes) {
      gherkinQuery.update(envelope)
    }
    for (const envelope of envelopes) {
      if (envelope.gherkinDocument) {
        search.add(envelope.gherkinDocument)
      }
    }
    return pretty(search.search(query)[0])
  }

  context('search', () => {
    context('when using a tag expression query', () => {
      it('uses TagSearch to filter the results', () => {
        const results = prettyResults(feature, '@planet')
        assert.strictEqual(
          results,
          `Feature: Solar System

  @planet
  Scenario: Earth
    Given is the sixth planet from the Sun
`
        )
      })

      it('does not raises error when tag expression is incorrect', () => {
        const results = prettyResults(feature, '(@planet or @dwarf))')
        assert.strictEqual(
          results,
          `Feature: Solar System

  @planet
  Scenario: Earth
    Given is the sixth planet from the Sun

  @dwarf
  Scenario: Pluto
    Given it is not really a planet
`
        )
      })
    })

    context('when using a query which is not a tag expression', () => {
      it('uses TextSearch to filter the results', () => {
        const results = prettyResults(feature, 'not really (')
        assert.strictEqual(
          results,
          `Feature: Solar System

  @dwarf
  Scenario: Pluto
    Given it is not really a planet
`
        )
      })
    })
  })
})
