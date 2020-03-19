import assert from 'assert'
import Step from '../src/Step'

describe('Step', () => {
  context('contentByLineNumber', () => {
    it('returns a hash with content for each line for rendering', () => {
      const scenario = new Step(
        12,
        'Given ',
        'something',
      )

      assert.deepStrictEqual(
        scenario.contentByLineNumber(),
        new Map([
          [12, '    Given something']
        ])
      )
    })
  })
})
