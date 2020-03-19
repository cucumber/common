import assert from 'assert'
import Feature from '../src/Feature'
import FeatureElement from '../src/FeatureElement'

context('Feature', () => {
  context('toString', () => {
    it('outputs the name and keyword of the feature', () => {
      const feature = new Feature(1, 'Funksjonalitet', 'my feature', '')

      assert.equal(feature.toString(), 'Funksjonalitet: my feature\n')
    })

    it('respects the line number', () => {
      const feature = new Feature(3, 'Funksjonalitet', 'my feature', '')

      assert.equal(feature.toString(), '\n\nFunksjonalitet: my feature\n')
    })

    it('ouputs the decription if it exists', () => {
      const feature = new Feature(
        3,
        'Funksjonalitet',
        'my feature',
        '  This is a feature file'
      )

      assert.equal(
        feature.toString(),
        '\n\nFunksjonalitet: my feature\n  This is a feature file\n'
      )
    })

    it('displays scenarios if provided', () => {
      const feature = new Feature(
        3,
        'Funksjonalitet',
        'my feature',
        '  This is a feature file',
        [new FeatureElement(
          8,
          'Scenario',
          'A simple scenario',
          'With a description'
        )]
      )

      assert.equal(
        feature.toString(),
        '\n\nFunksjonalitet: my feature\n  This is a feature file\n\n\n\n  Scenario: A simple scenario\nWith a description\n'
      )
    })
  })
})
