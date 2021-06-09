import assert from 'assert'
import { IFeature } from '../src/cucumber-generic/JSONSchema'
import { IFeature as IBehaveFeature } from '../src/behave/JSONSchema'
import { IElement, IStep as IJSStep, IDocString } from '../src/cucumber-js/JSONSchema'
import detectImplementation from '../src/detectImplementation'

describe('detectImplementation', () => {
  it('defaults to "ruby"', () => {
    const feature = {} as IFeature

    assert.strictEqual(detectImplementation(feature), 'cucumber-ruby')
  })

  context('when the feature has a status field', () => {
    it('returns "behave"', () => {
      const feature = {
        status: 'passed',
      } as IBehaveFeature

      assert.strictEqual(detectImplementation(feature), 'behave')
    })
  })

  context('when the feature has a location field', () => {
    it('returns "behave"', () => {
      const feature = {
        location: 'my/wonderful.feature:3',
      } as IBehaveFeature

      assert.strictEqual(detectImplementation(feature), 'behave')
    })
  })

  context('when a step has an "hidden" field', () => {
    it('returns "javascript"', () => {
      const steps: readonly IJSStep[] = [
        {} as IJSStep,
        {
          hidden: true,
        } as IJSStep,
      ]

      const elements: readonly IElement[] = [
        {
          steps,
        } as IElement,
      ]

      const feature = {
        elements,
      } as IFeature

      assert.strictEqual(detectImplementation(feature), 'cucumber-js')
    })
  })

  context('when a step has an "arguments" field', () => {
    it('returns "javascript"', () => {
      const args: readonly IDocString[] = []
      const steps: readonly IJSStep[] = [
        {} as IJSStep,
        {
          arguments: args,
        } as IJSStep,
      ]

      const elements: readonly IElement[] = [
        {
          steps,
        } as IElement,
      ]

      const feature = {
        elements,
      } as IFeature

      assert.strictEqual(detectImplementation(feature), 'cucumber-js')
    })
  })
})
