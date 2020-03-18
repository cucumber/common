import assert from 'assert'

import Scenario from "../src/Scenario"

describe('Scenario', () => {
  context('contentByLineNumber', () => {
    it('returns a hash with content for each line for rendering', () => {
      const scenario = new Scenario(
        5,
        'Zenario',
        'My super scenario',
        'Some\n\ndescription'
      )

      assert.deepStrictEqual(scenario.contentByLineNumber(), new Map([
        [5, '  Zenario: My super scenario'],
        [6, 'Some'],
        [7, ''],
        [8, 'description']
      ]))
    })
  })
})