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

  describe('#makeBackgroundFeatureChild', () => {
    const child = astMaker.makeBackgroundFeatureChild(1, '', '', '', [])

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

  context('#makeScenarioFeatureChild', () => {
    const child = astMaker.makeScenarioFeatureChild('id', 1, '', '', '', [])

    it('returns a child without background', () => {
      assert.equal(child.background, null)
    })

    it('return a child with a scenario', () => {
      assert.notEqual(child.scenario, null)
    })

    it('return a child without rule', () => {
      assert.equal(child.rule, null)
    })

    it('creates an ID for the scenario', () => {
      const child = astMaker.makeScenarioFeatureChild('id', 1, '', '', '', [])
      assert.equal(child.scenario.id, 'id')
    })
  })

  describe('makeStep', () => {
    it('generate an ID for the step', () => {
      const step = astMaker.makeStep('id', 10, 'Given ', 'some context')

      assert.equal(step.id, 'id')
    })
  })
})
