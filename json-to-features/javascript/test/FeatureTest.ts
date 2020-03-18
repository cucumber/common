import assert from 'assert'
import Feature from '../src/Feature'

context('Feature', () => {
  context('toString', () => {
    it('outputs the name and keyword of the feature', () => {
      const feature = new Feature('Funksjonalitet', 'my feature')

      assert.equal(feature.toString(), 'Funksjonalitet: my feature')
    })

    it('respects the line number', () => {
      const feature = new Feature('Funksjonalitet', 'my feature', '', 3)

      assert.equal(feature.toString(), '\n\nFunksjonalitet: my feature')
    })

    it('ouputs the decription if it exists', () => {
      const feature = new Feature(
        'Funksjonalitet',
        'my feature',
        '  This is a feature file',
        3
      )

      assert.equal(
        feature.toString(),
        '\n\nFunksjonalitet: my feature\n  This is a feature file'
      )
    })
  })
})
