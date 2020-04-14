/* eslint-disable @typescript-eslint/camelcase */

import assert from 'assert'
import { messages, IdGenerator } from '@cucumber/messages'
import { stubInterface } from 'ts-sinon'
import { IStep, IElement } from '../../src/cucumber-ruby/JSONSchema'
import { traverseElement } from '../../src/cucumber-ruby/JSONTraverse'

import IAstMaker from '../../src/IAstMaker'

import {
  traverseFeature,
  traverseTag,
} from '../../src/cucumber-generic/JSONTraverse'
import { IFeature } from '../../src/cucumber-generic/JSONSchema'

import IPredictableSupportCode from '../../src/IPredictableSupportCode'

describe('traversing elements', () => {
  const simpleStep: IStep = {
    keyword: 'Given',
    name: ' some context',
    line: 10,
    match: {
      location: 'some/steps.rb:11',
    },
    result: {
      duration: 123,
      status: 'whatever',
    },
  }

  const background: IElement = {
    id: 'my-background',
    type: 'background',
    keyword: 'Background',
    name: '',
    description: 'This background doe not much stuff',
    line: 3,
    steps: [],
  }

  const scenario: IElement = {
    id: 'my-scenario',
    type: 'scenario',
    keyword: 'Scenario',
    name: 'My scenario',
    description: 'This is my first scenario',
    line: 5,
    steps: [simpleStep],
  }

  describe('traverseFeature', () => {
    const feature: IFeature = {
      uri: 'path/to/some.feature',
      id: 'my-feature',
      line: 2,
      keyword: 'Feature',
      name: 'My feature',
      description: 'It does things and stuff',
      elements: [scenario],
    }

    const emptyFeature: IFeature = {
      uri: 'path/to/empty.feature',
      id: 'empty-feature',
      line: 1,
      keyword: 'Feature',
      name: 'An empty feature',
      description: 'It does nothing',
      elements: [],
    }

    const multiBackgroundFeature: IFeature = {
      uri: 'path/to/some.feature',
      id: 'my-feature',
      line: 2,
      keyword: 'Feature',
      name: 'My feature',
      description: 'It does things and stuff',
      elements: [background, background, background],
    }

    it('calls AstMaker.makeFeature', () => {
      const astMaker = stubInterface<IAstMaker>()
      const predictableSupportCode = stubInterface<IPredictableSupportCode>()

      traverseFeature(
        emptyFeature,
        astMaker,
        IdGenerator.incrementing(),
        predictableSupportCode,
        traverseElement
      )

      assert.deepEqual(astMaker.makeFeature.getCall(0).args, [
        1,
        'Feature',
        'An empty feature',
        'It does nothing',
        [],
        undefined,
      ])
    })

    it('uses the result of AtMaker.makeFeatureChild to populate the children', () => {
      const gherkinScenario = messages.GherkinDocument.Feature.FeatureChild.create(
        {
          scenario: messages.GherkinDocument.Feature.Scenario.create({
            id: 'whatever-scenario-id',
          }),
        }
      )
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeScenarioFeatureChild.returns(gherkinScenario)

      traverseFeature(
        feature,
        astMaker,
        IdGenerator.incrementing(),
        supportCode,
        traverseElement
      )

      assert.deepEqual(astMaker.makeFeature.getCall(0).args, [
        2,
        'Feature',
        'My feature',
        'It does things and stuff',
        [gherkinScenario],
        undefined,
      ])
    })

    it('calls AstMaker.makeGherkinDocument with the generated feature', () => {
      const gherkinFeature = messages.GherkinDocument.Feature.create({
        name: 'My awesome feature',
      })
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeFeature.returns(gherkinFeature)

      traverseFeature(
        feature,
        astMaker,
        IdGenerator.incrementing(),
        supportCode,
        traverseElement
      )

      assert.deepStrictEqual(astMaker.makeGherkinDocument.getCall(0).args, [
        'path/to/some.feature',
        gherkinFeature,
      ])
    })

    it('does not traverse the backgrounds when replicated', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseFeature(
        multiBackgroundFeature,
        astMaker,
        IdGenerator.incrementing(),
        supportCode,
        traverseElement
      )

      assert.ok(astMaker.makeBackgroundFeatureChild.calledOnce)
    })
  })

  describe('travereTag', () => {
    it('calls AstMaker.makeTag to create the message', () => {
      const astMaker = stubInterface<IAstMaker>()

      traverseTag({ name: '@something', line: 1 }, astMaker)

      assert.deepEqual(astMaker.makeTag.getCall(0).args, ['@something', 1])
    })
  })
})
