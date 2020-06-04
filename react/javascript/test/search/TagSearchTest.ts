import { messages } from '@cucumber/messages'
import assert from 'assert'
import { parseAndCompile } from '@cucumber/gherkin'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import { pretty } from '@cucumber/gherkin-utils'
import TagSearch from '../../src/search/TagSearch'

describe('TagSearchTest', () => {
  let gherkinQuery: GherkinQuery
  let tagSearch: TagSearch
  let messagesHandler: (envelope: messages.IEnvelope) => void

  const feature = `@system
Feature: Solar System

  @planet
  Scenario: Earth
    Given is the sixth planet from the Sun

  @dwarf
  Scenario: Pluto
    Given it is not really a planet
  `

  beforeEach(() => {
    gherkinQuery = new GherkinQuery()
    tagSearch = new TagSearch(gherkinQuery)
    messagesHandler = (envelope: messages.IEnvelope) => {
      gherkinQuery.update(envelope)
    }
  })

  function prettyResults(feature: string, query: string): string {
    const gherkinDocument = parseAndCompile(feature, messagesHandler)
    tagSearch.add(gherkinDocument)
    return pretty(tagSearch.search(query)[0])
  }

  context('search', () => {
    it('return an empty list when no document have been added', () => {
      assert.deepEqual(tagSearch.search('@any'), [])
    })

    it('return an empty list the query has no match', () => {
      assert.deepEqual(tagSearch.search('@sattelite'), [])
    })

    it('finds matching scenarios', () => {
      assert.ok(prettyResults(feature, '@planet').includes('Scenario: Earth'))
    })

    it('takes into account feature tags', () => {
      const results = prettyResults(feature, '@system')

      assert.ok(results.includes('Scenario: Earth'))
      assert.ok(results.includes('Scenario: Pluto'))
    })

    it('supports complex search', () => {
      const results = prettyResults(feature, '@system and not @dwarf')

      assert.ok(results.includes('Scenario: Earth'))
      assert.ok(!results.includes('Scenario: Pluto'))
    })
  })

  context('with examples and tags', () => {
    // Currently, we are filtering at the scenario level,
    // so as long as one example match, we keep them all.

    const exampleFeature = `@system
Feature: Solar system

  Scenario: a planet may have sattelites
    Then <satellites> should arround <planet>

    @solid
    Examples: solid planets
      | planet | satellites     |
      | earth  | moon           |
      | mars   | phobos, demios |

    @gas
    Examples: giant gas planets
      | jupiter | Io, Europe, Ganymède, Callisto |
`
    it('does not filter non-matching examples', () => {
      const results = prettyResults(exampleFeature, '@solid')

      assert.ok(results.includes('Scenario: a planet may have sattelites'))
      assert.ok(results.includes('Examples: solid planets'))
      assert.ok(results.includes('Examples: giant gas planets'))
    })

    it('does not filter examples which should be excluded', () => {
      const results = prettyResults(exampleFeature, '@solid and not @gas')

      assert.ok(results.includes('Scenario: a planet may have sattelites'))
      assert.ok(results.includes('Examples: solid planets'))
      assert.ok(results.includes('Examples: giant gas planets'))
    })
  })
})
