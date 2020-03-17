import pretty from '../../src/pretty-formatter/pretty'
import assert from 'assert'
import parse from './parse'
import Search from '../../src/search/Search'

describe('Search', () => {
  it('keeps scenario with search hit in step', () => {
    const gherkinDocument = parse(`Feature: Solar System

  Scenario: Saturn
    Given is the sixth planet from the Sun

  Scenario: Earth
    Given is a planet with liquid water
    And humans living on it
`)

    const search = new Search()
    search.add(gherkinDocument)

    const searchResultGherkinDocument = search.search('liquid')[0]
    const newSource = pretty(searchResultGherkinDocument)
    const expectedNewSource = `Feature: Solar System

  Scenario: Earth
    Given is a planet with liquid water
    And humans living on it
`
    assert.strictEqual(newSource, expectedNewSource)
  })
})
