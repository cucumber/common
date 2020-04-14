import assert from 'assert'
import { IFeature } from '../src/cucumber-generic/JSONSchema'
import { IFeature as IBehaveFeature } from '../src/behave/JSONSchema'
import {
  IElement,
  IStep as IJSStep,
  IDocString,
} from '../src/cucumber-js/JSONSchema'
import detectLanguage from '../src/detectLanguage'

describe('detectLanguage', () => {
  it('defaults to "ruby"', () => {
    const feature = {} as IFeature

    assert.equal(detectLanguage(feature), 'ruby')
  })

  context('when the feature has a status field', () => {
    it('returns "behave"', () => {
      const feature = {
        status: 'passed',
      } as IBehaveFeature

      assert.equal(detectLanguage(feature), 'behave')
    })
  })

  context('when the feature has a location field', () => {
    it('returns "behave"', () => {
      const feature = {
        location: 'my/wonderful.feature:3',
      } as IBehaveFeature

      assert.equal(detectLanguage(feature), 'behave')
    })
  })

  context('when a step has an "hidden" field', () => {
    it('returns "javascript"', () => {
      const steps: ReadonlyArray<IJSStep> = [
        {} as IJSStep,
        {
          hidden: true,
        } as IJSStep,
      ]

      const elements: ReadonlyArray<IElement> = [
        {
          steps,
        } as IElement,
      ]

      const feature = {
        elements,
      } as IFeature

      assert.equal(detectLanguage(feature), 'javascript')
    })
  })

  context('when a step has an "arguments" field', () => {
    it('returns "javascript"', () => {
      const args: ReadonlyArray<IDocString> = []
      const steps: ReadonlyArray<IJSStep> = [
        {} as IJSStep,
        {
          arguments: args,
        } as IJSStep,
      ]

      const elements: ReadonlyArray<IElement> = [
        {
          steps,
        } as IElement,
      ]

      const feature = {
        elements,
      } as IFeature

      assert.equal(detectLanguage(feature), 'javascript')
    })
  })
})
