import assert from 'assert'
import { IdGenerator } from '@cucumber/messages'
import Search from '../../src/search/Search'
import Parser from '@cucumber/gherkin/dist/src/Parser'
import AstBuilder from '@cucumber/gherkin/dist/src/AstBuilder'
import pretty from '../../src/pretty-formatter/pretty'

describe('Search', () => {
  let search: Search
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
`

  beforeEach(() => {
    const newId = IdGenerator.uuid()
    const parser = new Parser(new AstBuilder(newId))
    const gherkinDocument = parser.parse(source)

    search = new Search()
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
})
