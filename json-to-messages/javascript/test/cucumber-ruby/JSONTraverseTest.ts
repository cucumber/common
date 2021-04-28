import assert from 'assert'
import * as messages from '@cucumber/messages'
import { stubInterface } from 'ts-sinon'
import { IStep, IDocString, IDataTableRow, IElement } from '../../src/cucumber-ruby/JSONSchema'
import IAstMaker from '../../src/IAstMaker'
import {
  traverseFeature,
  traverseElement,
  traverseStep,
  traverseDocString,
  traverseDataTable,
} from '../../src/cucumber-ruby/JSONTraverse'
import IPredictableSupportCode from '../../src/IPredictableSupportCode'
import { IFeature } from '../../src/cucumber-generic/JSONSchema'

describe('traversing elements', () => {
  const simpleStep: IStep = {
    keyword: 'Given',
    name: ' some context',
    line: 10,
    match: {
      location: 'some/steps.rb:11',
    },
    result: {
      duration: 12300000,
      status: 'passed',
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
        messages.IdGenerator.incrementing(),
        predictableSupportCode
      )

      assert.deepEqual(astMaker.makeFeature.getCall(0).args, [
        1,
        'Feature',
        'An empty feature',
        'It does nothing',
        [],
        [],
      ])
    })

    it('uses the result of AstMaker.makeFeatureChild to populate the children', () => {
      const gherkinScenario: messages.FeatureChild = {
        scenario: {
          id: 'whatever-scenario-id',
          description: '',
          examples: [],
          keyword: 'Scenario',
          location: { line: 1 },
          name: 'Whatever',
          steps: [],
          tags: [],
        },
      }
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeScenarioFeatureChild.returns(gherkinScenario)

      traverseFeature(feature, astMaker, messages.IdGenerator.incrementing(), supportCode)

      assert.deepEqual(astMaker.makeFeature.getCall(0).args, [
        2,
        'Feature',
        'My feature',
        'It does things and stuff',
        [gherkinScenario],
        [],
      ])
    })

    it('calls AstMaker.makeGherkinDocument with the generated feature', () => {
      const gherkinFeature: messages.Feature = {
        name: 'My awesome feature',
        keyword: 'Feature',
        children: [],
        description: '',
        language: 'en',
        location: { line: 1 },
        tags: [],
      }
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeFeature.returns(gherkinFeature)

      traverseFeature(feature, astMaker, messages.IdGenerator.incrementing(), supportCode)

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
        messages.IdGenerator.incrementing(),
        supportCode
      )

      assert.ok(astMaker.makeBackgroundFeatureChild.calledOnce)
    })
  })

  describe('traverseElement', () => {
    it('calls AstMaker.makeFeatureChild with the correct data', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseElement(background, astMaker, messages.IdGenerator.incrementing(), supportCode)

      assert.deepStrictEqual(astMaker.makeBackgroundFeatureChild.getCall(0).args, [
        3,
        'Background',
        '',
        'This background doe not much stuff',
        [],
      ])
    })

    it('steps are created when intanciating the FeatureElement', () => {
      const step: messages.Step = {
        id: 'whatever-id',
        keyword: 'Given ',
        location: { line: 1 },
        text: 'whatever',
      }
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeStep.returns(step)

      traverseElement(scenario, astMaker, messages.IdGenerator.incrementing(), supportCode)

      assert.deepStrictEqual(astMaker.makeScenarioFeatureChild.getCall(0).args[5], [step])
    })

    it('registers hook if available', () => {
      const child: messages.FeatureChild = {
        scenario: {
          id: 'some-scenario-id',
          description: '',
          examples: [],
          keyword: 'Scenario',
          location: { line: 1 },
          name: 'Whatever',
          steps: [],
          tags: [],
        },
      }
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeScenarioFeatureChild.returns(child)

      traverseElement(
        {
          before: [
            {
              match: {
                location: 'some/steps.rb:2',
              },
              result: {
                status: 'passed',
                duration: 12300,
              },
            },
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
                location: 'some/steps.rb:12',
              },
              result: {
                status: 'failed',
                duration: 123000,
                error_message: 'This has failed',
              },
            },
          ],
        },
        astMaker,
        messages.IdGenerator.incrementing(),
        supportCode
      )

      assert.deepEqual(supportCode.addPredictableBeforeHook.getCall(0).args, [
        'some/steps.rb:2',
        child.scenario.id,
        'passed',
        0.0123,
        undefined,
      ])

      assert.deepEqual(supportCode.addPredictableAfterHook.getCall(0).args, [
        'some/steps.rb:12',
        child.scenario.id,
        'failed',
        0.123,
        'This has failed',
      ])
    })
  })

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
      docString: {
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

      traverseStep(simpleStep, astMaker, () => 'the-id', supportCode)

      assert.deepEqual(astMaker.makeStep.getCall(0).args, [
        'the-id',
        10,
        'Given',
        ' some context',
        null,
        null,
      ])
    })

    it('passes on docstring is available', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseStep(docStringStep, astMaker, messages.IdGenerator.incrementing(), supportCode)

      assert.notStrictEqual(astMaker.makeStep.getCall(0).args[3], null)
    })

    it('passes on datatable is available', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()

      traverseStep(datatableStep, astMaker, () => 'the-id', supportCode)

      assert.notStrictEqual(astMaker.makeStep.getCall(0).args[5], null)
    })

    it('registers a stepDefinition using supportCode', () => {
      const step: messages.Step = {
        id: 'some-step-id',
        keyword: 'Given ',
        location: { line: 1 },
        text: 'whatever',
      }
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeStep.returns(step)

      traverseStep(simpleStep, astMaker, messages.IdGenerator.incrementing(), supportCode)

      assert.deepStrictEqual(supportCode.addPredictableStepDefinition.getCall(0).args, [
        'some/steps.rb:11',
        step.id,
        'passed',
        12.3,
        undefined,
      ])
    })

    it('does not register stepDefinition when a step has no match', () => {
      const step: messages.Step = {
        id: 'some-step-id',
        keyword: 'Given ',
        location: { line: 1 },
        text: 'whatever',
      }
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeStep.returns(step)

      traverseStep(
        {
          keyword: 'Given',
          name: 'an undefined step',
          line: 10,
          result: {
            status: 'undefined',
          },
        },
        astMaker,
        messages.IdGenerator.incrementing(),
        supportCode
      )

      assert.strictEqual(supportCode.addPredictableStepDefinition.callCount, 0)
    })

    it('does not register stepDefinition when a step has an empty match', () => {
      const step: messages.Step = {
        id: 'some-step-id',
        keyword: 'Given ',
        location: { line: 1 },
        text: 'whatever',
      }
      const supportCode = stubInterface<IPredictableSupportCode>()
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeStep.returns(step)

      traverseStep(
        {
          keyword: 'Given',
          name: 'an undefined step',
          line: 10,
          result: {
            status: 'undefined',
          },
          match: {
            location: undefined,
          },
        },
        astMaker,
        messages.IdGenerator.incrementing(),
        supportCode
      )

      assert.strictEqual(supportCode.addPredictableStepDefinition.callCount, 0)
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

      assert.strictEqual(astMaker.makeDocstring.callCount, 1)
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
