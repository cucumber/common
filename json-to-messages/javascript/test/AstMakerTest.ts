import assert from 'assert'
import AstMaker from '../src/AstMaker'

describe('AstMaker', () => {
  const astMaker = new AstMaker()

  describe('.makeFeature', () => {
    it('transforms the line to a Location object', () => {
      const feature = astMaker.makeFeature(12, '', '', '', [])

      assert.equal(feature.location.line, 12)
    })
  })

  describe('.makeFeatureChild', () => {
    it('throws an error for unknown type', () => {
      assert.throws(() => {
        astMaker.makeFeatureChild('unknown', 1, '', '', '', [])
      })
    })

    context('when the type is "background"', () => {
      const child = astMaker.makeFeatureChild('background', 1, '', '', '', [])

      it('returns a child with a background', () => {
        assert.notEqual(child.background, null)
      })

      it('return a child without scenario', () => {
        assert.equal(child.scenario, null)
      })

      it('return a child without rule', () => {
        assert.equal(child.rule, null)
      })
    })

    context('when the type is "scenario"', () => {
      const child = astMaker.makeFeatureChild('scenario', 1, '', '', '', [])

      it('returns a child without background', () => {
        assert.equal(child.background, null)
      })

      it('return a child with a scenario', () => {
        assert.notEqual(child.scenario, null)
      })

      it('return a child without rule', () => {
        assert.equal(child.rule, null)
      })
    })

    it('creates an ID for the scenario', () => {
      const child = astMaker.makeFeatureChild('scenario', 1, '', '', '', [])
      assert.notEqual(child.scenario.id, '')
    })
  })

  describe('makeStep', () => {
    it('generate an ID for the step', () => {
      const step = astMaker.makeStep(10, 'Given ', 'some context')

      assert.notEqual(step.id, '')
    })
  })
})
