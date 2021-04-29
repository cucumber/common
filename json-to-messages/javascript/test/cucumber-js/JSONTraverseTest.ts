import assert from 'assert'
import { IStep, IDocString, IElement } from '../../src/cucumber-js/JSONSchema'
import { stubInterface } from 'ts-sinon'
import IAstMaker from '../../src/IAstMaker'
import {
  traverseStep,
  traverseDocString,
  traverseBeforeHook,
  traverseAfterHook,
  traverseElement,
} from '../../src/cucumber-js/JSONTraverse'
import IPredictableSupportCode from '../../src/IPredictableSupportCode'
import * as messages from '@cucumber/messages'

describe('traversing elements', () => {
  context('traverseFeature', () => {
    it('create ')
  })

  context('traverseElement', () => {
    const simpleScenario: IElement = {
      id: 'my-scenario',
      line: 3,
      keyword: 'scenario',
      type: 'scenario',
      name: 'My scenario',
      description: 'This scenario does things',
      steps: [
        {
          keyword: 'Given ',
          line: 6,
          name: 'a failed step',
          result: {
            status: 'failed',
          },
          match: {
            location: 'whatever.go:123',
          },
        },
      ],
    }

    const hookedScenario: IElement = {
      id: 'my-scenario',
      line: 3,
      keyword: 'scenario',
      type: 'scenario',
      name: 'My scenario',
      description: 'This scenario does things',
      steps: [
        {
          hidden: true,
          keyword: 'Before ',
          line: 3,
          name: '',
          result: {
            status: 'passed',
            duration: 4560000,
          },
          match: {
            location: 'whatever.go:123',
          },
        },
        {
          keyword: 'Given ',
          line: 6,
          name: 'a failed step',
          result: {
            status: 'passed',
            duration: 456000,
          },
          match: {
            location: 'whatever.go:123',
          },
        },
        {
          hidden: true,
          keyword: 'After',
          line: 3,
          name: '',
          result: {
            status: 'failed',
            error_message: 'This hook failed',
            duration: 45600000,
          },
          match: {
            location: 'whatever.go:456',
          },
        },
      ],
    }

    it('creates a Scenario using the AstMaker', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()
      const step: messages.Step = {
        id: 'step-id',
        text: 'hello',
        location: { line: 0, column: 0 },
        keyword: 'Given ',
      }
      astMaker.makeStep.returns(step)

      traverseElement(simpleScenario, astMaker, () => 'new-id', supportCode)

      assert.deepStrictEqual(astMaker.makeScenarioFeatureChild.getCall(0).args, [
        'new-id',
        3,
        'scenario',
        'My scenario',
        'This scenario does things',
        [step],
        [],
      ])
    })

    it('doe not create steps for hooks', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()
      astMaker.makeScenarioFeatureChild.returns({
        scenario: {
          id: 'scenario-id',
          examples: [],
          location: { column: 0, line: 0 },
          name: 'Name',
          steps: [],
          tags: [],
          keyword: 'Scenario',
          description: '',
        },
      })

      traverseElement(hookedScenario, astMaker, () => 'new-id', supportCode)
      assert.strictEqual(astMaker.makeStep.callCount, 1)
    })

    it('correctly registers beforeHooks', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()
      astMaker.makeScenarioFeatureChild.returns({
        scenario: {
          id: 'scenario-id',
          examples: [],
          location: { column: 0, line: 0 },
          name: 'Name',
          steps: [],
          tags: [],
          keyword: 'Scenario',
          description: '',
        },
      })

      traverseElement(hookedScenario, astMaker, () => 'new-id', supportCode)

      assert.deepStrictEqual(supportCode.addPredictableBeforeHook.getCall(0).args, [
        'whatever.go:123',
        'scenario-id',
        'passed',
        4.56,
        undefined,
      ])
    })

    it('correctly registers afterHooks', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()
      astMaker.makeScenarioFeatureChild.returns({
        scenario: {
          id: 'scenario-id',
          examples: [],
          location: { column: 0, line: 0 },
          name: 'Name',
          steps: [],
          tags: [],
          keyword: 'Scenario',
          description: '',
        },
      })

      traverseElement(hookedScenario, astMaker, () => 'new-id', supportCode)

      assert.deepStrictEqual(supportCode.addPredictableAfterHook.getCall(0).args, [
        'whatever.go:456',
        'scenario-id',
        'failed',
        45.6,
        'This hook failed',
      ])
    })
  })

  context('traverseBeforeHook', () => {
    const beforeHook: IStep = {
      hidden: true,
      keyword: 'Before ',
      line: 15,
      name: '',
      result: {
        status: 'passed',
        duration: 4560000,
      },
      match: {
        location: 'whatever.go:123',
      },
    }

    it('registers the before Hook with the correct data', () => {
      const supportCode = stubInterface<IPredictableSupportCode>()
      traverseBeforeHook(
        beforeHook,
        {
          id: 'scenario-id',
          examples: [],
          location: { column: 0, line: 0 },
          name: 'Name',
          steps: [],
          tags: [],
          keyword: 'Scenario',
          description: '',
        },
        supportCode
      )

      assert.deepStrictEqual(supportCode.addPredictableBeforeHook.getCall(0).args, [
        'whatever.go:123',
        'scenario-id',
        'passed',
        4.56,
        undefined,
      ])
    })
  })

  context('traverseAfterHook', () => {
    const beforeHook: IStep = {
      hidden: true,
      keyword: 'After ',
      line: 15,
      name: '',
      result: {
        status: 'passed',
        duration: 1230000,
      },
      match: {
        location: 'whatever.go:123',
      },
    }

    it('registers the after Hook with the correct data', () => {
      const supportCode = stubInterface<IPredictableSupportCode>()
      traverseAfterHook(
        beforeHook,
        {
          id: 'scenario-id',
          examples: [],
          location: { column: 0, line: 0 },
          name: 'Name',
          steps: [],
          tags: [],
          keyword: 'Scenario',
          description: '',
        },
        supportCode
      )

      assert.deepStrictEqual(supportCode.addPredictableAfterHook.getCall(0).args, [
        'whatever.go:123',
        'scenario-id',
        'passed',
        1.23,
        undefined,
      ])
    })
  })

  context('traverseStep', () => {
    const simpleStep: IStep = {
      keyword: 'Given ',
      line: 15,
      name: 'a step with a doctring:',
      result: {
        status: 'failed',
        duration: 456000,
      },
      match: {
        location: 'whatever.go:123',
      },
    }

    const docStringStep: IStep = {
      arguments: [
        {
          content: '  This is some content',
          line: 16,
        },
      ],
      keyword: 'Given ',
      line: 15,
      name: 'a step with a doctring:',
      result: {
        status: 'undefined',
      },
    }

    const datatableStep: IStep = {
      arguments: [
        {
          rows: [
            {
              cells: ['name', 'value'],
            },
            {
              cells: ['plic', '0'],
            },
            {
              cells: ['ploc', '1'],
            },
          ],
        },
      ],
      keyword: 'Given ',
      line: 15,
      name: 'a step with a doctring:',
      result: {
        status: 'undefined',
      },
    }

    it('builds the doctring using the AstMaker', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()
      const docString: messages.DocString = {
        content: 'hello',
        delimiter: '"""',
        location: { line: 0, column: 0 },
      }
      astMaker.makeDocstring.returns(docString)

      traverseStep(docStringStep, astMaker, () => 'the-id', supportCode)

      assert.deepStrictEqual(astMaker.makeStep.getCall(0).args, [
        'the-id',
        15,
        'Given ',
        'a step with a doctring:',
        docString,
        null,
      ])
    })

    it('builds the datatable using the astMaker', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()
      const datatable: messages.DataTable = {
        location: { line: 0, column: 0 },
        rows: [],
      }
      astMaker.makeDataTable.returns(datatable)

      traverseStep(datatableStep, astMaker, () => 'the-id', supportCode)

      assert.deepStrictEqual(astMaker.makeStep.getCall(0).args, [
        'the-id',
        15,
        'Given ',
        'a step with a doctring:',
        null,
        datatable,
      ])
    })

    it('registers the step in supportCode', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()
      astMaker.makeStep.returns({
        id: 'a-random-step-id',
        text: 'hello',
        location: { line: 0, column: 0 },
        keyword: 'Given ',
      })

      traverseStep(simpleStep, astMaker, () => 'the-id', supportCode)

      assert.deepStrictEqual(supportCode.addPredictableStepDefinition.getCall(0).args, [
        'whatever.go:123',
        'a-random-step-id',
        'failed',
        0.456,
        undefined,
      ])
    })
  })

  context('traverseDocString', () => {
    const docString: IDocString = {
      content: '  This is some content',
      line: 16,
    }

    it('call AstMaker.makeDocString with the content but no media-type', () => {
      const astMaker = stubInterface<IAstMaker>()

      traverseDocString(docString, astMaker)
      assert.deepStrictEqual(astMaker.makeDocstring.getCall(0).args, [
        null,
        '  This is some content',
      ])
    })
  })
})
