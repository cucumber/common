import assert from 'assert'
import { messages, IdGenerator } from '@cucumber/messages'
import Search from '../../src/search/Search'
import { makeFeature, makeScenario, makeStep } from './utils'
import Parser from '@cucumber/gherkin/dist/src/Parser'
import AstBuilder from '@cucumber/gherkin/dist/src/AstBuilder'
import pretty from '../../src/pretty-formatter/pretty'

describe('Search', () => {
  let search: Search
  let gherkinDocuments: messages.IGherkinDocument[]

  beforeEach(() => {
    const source = `Feature: Continents

  Scenario: Europe
    Given France
    When Spain
    Then The Netherlands

  Scenario: America
    Given Mexico
    Then Brazil
  `

    const newId = IdGenerator.uuid()
    const parser = new Parser(new AstBuilder(newId))
    const gherkinDocument = parser.parse(source)

    search = new Search()
    search.add(gherkinDocument)
  })

  context('Hit found in step', () => {
    it('displays just one scenario', () => {
      const searchResults = search.search('Spain')

      assert.deepStrictEqual(pretty(searchResults[0]), `Feature: Continents

  Scenario: Europe
    Given France
    When Spain
    Then The Netherlands
`)
    })
  })
})


