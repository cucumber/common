/* eslint-disable @typescript-eslint/camelcase */

import assert from 'assert'
import { messages } from '@cucumber/fake-cucumber/node_modules/@cucumber/messages'
import { stubInterface } from 'ts-sinon'
import {
  IStep,
  IDocString,
  IDataTableRow,
  IElement,
  IFeature,
} from '../src/RubyJSONSchema'
import IAstMaker from '../src/IAstMaker'
import {
  traverseFeature,
  traverseElement,
  traverseStep,
  traverseDocString,
  traverseDataTable,
} from '../src/RubyJSONTraverse'
import IPredictableSupportCode from '../src/IPredictableSupportCode'


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
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseFeature(emptyFeature, astMaker, supportCode)

      assert.deepEqual(astMaker.makeFeature.getCall(0).args, [
        1,
        'Feature',
        'An empty feature',
        'It does nothing',
        [],
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
      astMaker.makeFeatureChild.returns(gherkinScenario)

      traverseFeature(feature, astMaker, supportCode)

      assert.deepEqual(astMaker.makeFeature.getCall(0).args, [
        2,
        'Feature',
        'My feature',
        'It does things and stuff',
        [gherkinScenario],
      ])
    })

    it('calls AstMaker.makeGherkinDocument with the generated feature', () => {
      const gherkinFeature = messages.GherkinDocument.Feature.create({
        name: 'My awesome feature',
      })
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeFeature.returns(gherkinFeature)

      traverseFeature(feature, astMaker, supportCode)

      assert.deepStrictEqual(astMaker.makeGherkinDocument.getCall(0).args, [
        'path/to/some.feature',
        gherkinFeature,
      ])
    })

    it('does not travere the backgrounds when replicated', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseFeature(multiBackgroundFeature, astMaker, supportCode)

      assert.ok(astMaker.makeFeatureChild.calledOnce)
    })
  })

  describe('traverseElement', () => {
    it('calls AstMaker.makeFeatureChild with the correct data', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseElement(background, astMaker, supportCode)

      assert.deepEqual(astMaker.makeFeatureChild.getCall(0).args, [
        'background',
        3,
        'Background',
        '',
        'This background doe not much stuff',
        [],
      ])
    })

    it('steps are created when intanciating the FeatureElement', () => {
      const step = messages.GherkinDocument.Feature.Step.create({
        id: 'whatever-id',
      })
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeStep.returns(step)

      traverseElement(scenario, astMaker, supportCode)

      assert.deepStrictEqual(astMaker.makeFeatureChild.getCall(0).args[5], [
        step,
      ])
    })

    it('registers hook if available', () => {
      const child = messages.GherkinDocument.Feature.FeatureChild.create({
        scenario: messages.GherkinDocument.Feature.Scenario.create({
          id: 'some-scenario-id'
        })
      })
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeFeatureChild.returns(child)

      traverseElement({
        before: [
          {
            match: {
              location: 'some/steps.rb:2'
            },
            result: {
              status: 'passed',
              duration: 123
            }
          }
        ],
        id: 'my-scenario',
        type: 'scenario',
        keyword: 'Scenario',
        name: 'My scenario',
        description: 'This is my first scenario',
        line: 5,
        steps: [simpleStep],
        after: [
          {
            match: {
              location: 'some/steps.rb:12'
            },
            result: {
              status: 'failed',
              duration: 123,
              error_message: 'This has failed'
            }
          }
        ]
      }, astMaker, supportCode)

      assert.deepEqual(
        supportCode.addPredictableBeforeHook.getCall(0).args,
        ['some/steps.rb:2', child.scenario.id, 'passed', undefined]
      )

      assert.deepEqual(
        supportCode.addPredictableAfterHook.getCall(0).args,
        ['some/steps.rb:12', child.scenario.id, 'failed', 'This has failed']
      )

    })
  })

  // describe('traverseBefore', () => {
  //   const beforeHook: IHook = {
  //     match: {
  //       location: 'steps.go:12',
  //     },
  //     result: {
  //       duration: 123,
  //       status: 'passed',
  //     },
  //   }
  // })

  // describe('traverseAfter', () => {
  //   const afterHook: IHook = {
  //     match: {
  //       location: 'steps.go:12',
  //     },
  //     result: {
  //       duration: 123,
  //       status: 'passed',
  //     },
  //   }
  // })

  describe('traverseStep', () => {
    const docStringStep: IStep = {
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
      doc_string: {
        content_type: 'text/markdown',
        value: '# This is a title',
      },
    }

    const datatableStep: IStep = {
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
      rows: [
        {
          cells: ['a', 'b', 'c'],
        },
      ],
    }

    it('calls AstMaker.makeStep', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseStep(simpleStep, astMaker, supportCode)

      assert.deepEqual(astMaker.makeStep.getCall(0).args, [
        10,
        'Given',
        ' some context',
        null,
        null,
      ])
    })

    it('passes on doctring is available', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseStep(docStringStep, astMaker, supportCode)

      assert.notStrictEqual(astMaker.makeStep.getCall(0).args[3], null)
    })

    it('passes on datatable is available', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseStep(datatableStep, astMaker, supportCode)

      assert.notStrictEqual(astMaker.makeStep.getCall(0).args[4], null)
    })

    it('registers a stepDefinition using supportCode', () => {
      const step = messages.GherkinDocument.Feature.Step.create({
        id: 'some-step-id'
      })
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeStep.returns(step)

      traverseStep(datatableStep, astMaker, supportCode)

      assert.deepEqual(
        supportCode.addPredictableStepDefinition.getCall(0).args,
        ['some/steps.rb:11', step.id, 'whatever']
      )
    })
  })

  describe('traverseDocString', () => {
    const docString: IDocString = {
      content_type: 'text/plain',
      value: 'Some random content',
    }

    it('calls AstMaker.makeDocString', () => {
      const astMaker = stubInterface<IAstMaker>()

      traverseDocString(docString, astMaker)

      assert.equal(astMaker.makeDocstring.callCount, 1)
    })
  })

  describe('traverseDataTable', () => {
    const dataTable: IDataTableRow[] = [
      {
        cells: ['username', 'password'],
      },
      {
        cells: ['admin', '@dmin'],
      },
      {
        cells: ['user', 's3cr3t'],
      },
    ]

    it('calls AstMaker.makeDataTable', () => {
      const astMaker = stubInterface<IAstMaker>()

      traverseDataTable(dataTable, astMaker)

      assert.deepEqual(astMaker.makeDataTable.getCall(0).args[0], [
        ['username', 'password'],
        ['admin', '@dmin'],
        ['user', 's3cr3t'],
      ])
    })
  })
})
