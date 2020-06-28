import assert from 'assert'
import TextSearch from '../../src/search/TextSearch'
import { pretty } from '@cucumber/gherkin-utils'
import { IdGenerator, messages } from '@cucumber/messages'
import { AstBuilder, Parser } from '@cucumber/gherkin'

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
    it('displays just one scenario', () => {
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
    it('displays just one scenario', () => {
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

    it('displays just one scenario', () => {
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
    it('returns no hits', () => {
      const searchResults = search.search('saturn')

      assert.deepStrictEqual(searchResults, [])
    })
  })
})

function parse(source: string): messages.IGherkinDocument {
  const newId = IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId))
  const gherkinDocument = parser.parse(source)
  gherkinDocument.uri = ''
  return gherkinDocument
}
