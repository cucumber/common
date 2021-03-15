import assert from 'assert'
import AstMaker from '../src/AstMaker'

describe('AstMaker', () => {
  const astMaker = new AstMaker()

  describe('.makeFeature', () => {
    it('transforms the line to a Location object', () => {
      const feature = astMaker.makeFeature(12, '', '', '', [])

      assert.strictEqual(feature.location.line, 12)
    })
  })

  describe('#makeBackgroundFeatureChild', () => {
    const child = astMaker.makeBackgroundFeatureChild(1, '', '', '', [])

    it('returns a child with a background', () => {
      assert(child.background)
    })

    it('returns a child without scenario', () => {
      assert(!child.scenario)
    })

    it('returns a child without rule', () => {
      assert(!child.rule)
    })
  })

  context('#makeScenarioFeatureChild', () => {
    const child = astMaker.makeScenarioFeatureChild('id', 1, '', '', '', [], [])

    it('returns a child without background', () => {
      assert(!child.background)
    })

    it('returns a child with a scenario', () => {
      assert(child.scenario)
    })

    it('returns a child without rule', () => {
      assert(!child.rule)
    })

    it('creates an ID for the scenario', () => {
      const child = astMaker.makeScenarioFeatureChild('id', 1, '', '', '', [], [])
      assert.strictEqual(child.scenario.id, 'id')
    })
  })

  describe('makeStep', () => {
    it('generates an ID for the step', () => {
      const step = astMaker.makeStep('id', 10, 'Given ', 'some context')

      assert.strictEqual(step.id, 'id')
    })
  })
})
