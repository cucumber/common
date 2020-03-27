import assert from 'assert'
import Search from '../../src/search/Search'
import pretty from '../../src/pretty-formatter/pretty'
import parse from './parse'

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

  Rule: zbui

    Scenario: Africa
      Given Ethiopia
`

  beforeEach(() => {
    const gherkinDocument = parse(source)

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

  context('Hit found in rule', () => {
    it('displays a rule', () => {
      const searchResults = search.search('zbui')

      assert.deepStrictEqual(
        pretty(searchResults[0]),
        `Feature: Continents

  Background: World
    Given the world exists

  Rule: zbui

    Scenario: Africa
      Given Ethiopia
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
