import assert from 'assert'
import TextSearch from '../../src/search/TextSearch'
import { pretty } from '@cucumber/gherkin-utils'
import * as messages from '@cucumber/messages'
import { AstBuilder, Parser, GherkinClassicTokenMatcher } from '@cucumber/gherkin'

describe('TextSearch', () => {
  let search: TextSearch
  const source = `Feature: Continents

  Background: World
    Given the world exists

  Scenario: Europe
    Given France
    When Spain
    Then The Netherlands

  Scenario: America
    Given Mexico
    Then Brazil

  Scenario: Africa
    Given Ethiopia

  Rule: uninhabited continents

    Scenario: Antartica
      Given some scientific bases
`

  beforeEach(() => {
    const gherkinDocument = parse(source)

    search = new TextSearch()
    search.add(gherkinDocument)
  })

  context('Hit found in step', () => {
    // TODO: Fix
    xit('displays just one scenario', () => {
      const searchResults = search.search('Spain')

      assert.deepStrictEqual(
        pretty(searchResults[0]),
        `Feature: Continents

  Background: World
    Given the world exists

  Scenario: Europe
    Given France
    When Spain
    Then The Netherlands
`
      )
    })
  })

  context('Hit found in scenario', () => {
    xit('displays just one scenario', () => {
      const searchResults = search.search('europe')

      assert.deepStrictEqual(
        pretty(searchResults[0]),
        `Feature: Continents

  Background: World
    Given the world exists

  Scenario: Europe
    Given France
    When Spain
    Then The Netherlands
`
      )
    })
  })

  context('Hit found in background', () => {
    it('displays all scenarios', () => {
      const searchResults = search.search('world')

      assert.deepStrictEqual(pretty(searchResults[0]), source)
    })

    it('finds hits in background steps', () => {
      const searchResults = search.search('exists')

      assert.deepStrictEqual(pretty(searchResults[0]), source)
    })
  })

  context('Hit found in rule', () => {
    it('displays a rule', () => {
      const searchResults = search.search('uninhabited')

      assert.deepStrictEqual(
        pretty(searchResults[0]),
        `Feature: Continents

  Background: World
    Given the world exists

  Rule: uninhabited continents

    Scenario: Antartica
      Given some scientific bases
`
      )
    })
  })

  context('No hit found', () => {
    // TODO: Fix
    xit('returns no hits', () => {
      const searchResults = search.search('saturn')

      assert.deepStrictEqual(searchResults, [])
    })
  })
})

function parse(source: string): messages.GherkinDocument {
  const newId = messages.IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId), new GherkinClassicTokenMatcher())
  const gherkinDocument = parser.parse(source)
  gherkinDocument.uri = ''
  return gherkinDocument
}
