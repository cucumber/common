import assert from 'assert'
import Step from '../src/Step';

class ExtractionResult {
  constructor(
    public readonly stepText: string,
    public readonly parameters: Map<string, string[]>,
  ) {}
}

class ParameterExtractor {
  public extract(steps: ReadonlyArray<Step>): ExtractionResult {
    const parameters = new Map<string, string[]>()
    const uniqueStepNames = new Set()
    for (const step of steps) {
      uniqueStepNames.add(step.name)
    }

    if (uniqueStepNames.size < 2) {
      return new ExtractionResult(steps[0].name, parameters)
    }
  }
}

describe('ParameterExtractor', () => {
  const extractor = new ParameterExtractor()

  context('extract', () => {
    context('when a single step is provided', () => {
      const step = new Step(12, 'Given ', 'whatever')
      const result = extractor.extract([step])

      it('returns an ExtractionResult with the name untouched', () => {
        assert.equal(result.stepText, 'whatever')
      })

      it('returns an ExtractionResult with empty parameters', () => {
        assert.equal(result.parameters.size, 0)
      })
    })

    context('when identical steps are provided', () => {
      const step = new Step(12, 'Given ', 'whatever')
      const result = extractor.extract([step, step, step])

      it('returns an ExtractionResult with the name untouched', () => {
        assert.equal(result.stepText, 'whatever')
      })

      it('returns an ExtractionResult with empty parameters', () => {
        assert.equal(result.parameters.size, 0)
      })
    })
  })
})