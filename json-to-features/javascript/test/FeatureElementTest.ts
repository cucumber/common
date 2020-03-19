import assert from 'assert'

import FeatureElement from "../src/FeatureElement"

describe('Scenario', () => {
  context('contentByLineNumber', () => {
    it('returns a hash with content for each line for rendering', () => {
      const scenario = new FeatureElement(
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