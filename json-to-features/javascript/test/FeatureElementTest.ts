import assert from 'assert'

import FeatureElement from '../src/FeatureElement'
import Step from '../src/Step'

describe('Scenario', () => {
  context('contentByLineNumber', () => {
    it('returns a hash with content for each line for rendering', () => {
      const scenario = new FeatureElement(
        5,
        'Zenario',
        'My super scenario',
        'Some\n\ndescription'
      )

      assert.deepStrictEqual(
        scenario.contentByLineNumber(),
        new Map([
          [5, '  Zenario: My super scenario'],
          [6, 'Some'],
          [7, ''],
          [8, 'description'],
        ])
      )
    })

    it('includes line of the steps', () => {
      const background = new FeatureElement(5, 'Background', '', '', [
        new Step(7, 'Given ', 'things'),
        new Step(8, 'And ', 'stuff'),
      ])

      assert.deepStrictEqual(
        background.contentByLineNumber(),
        new Map([
          [5, '  Background: '],
          [7, '    Given things'],
          [8, '    And stuff'],
        ])
      )
    })
  })
})
