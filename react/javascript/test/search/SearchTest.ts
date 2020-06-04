import assert from 'assert'
import { parseAndCompile } from '@cucumber/gherkin'

import { messages } from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import Search from '../../src/search/Search'
import { pretty } from '@cucumber/gherkin-utils'

describe('Search', () => {
  let search: Search
  let gherkinQuery: GherkinQuery
  let messagesHandler: (envelope: messages.IEnvelope) => void

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
    messagesHandler = (envelope: messages.IEnvelope) => {
      gherkinQuery.update(envelope)
    }
  })

  function prettyResults(feature: string, query: string): string {
    const gherkinDocument = parseAndCompile(feature, messagesHandler)
    search.add(gherkinDocument)
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
