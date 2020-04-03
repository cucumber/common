import assert from 'assert'
import { IStep, IDocString } from '../../src/cucumber-js.ts/JSONSchema'
import { stubInterface } from 'ts-sinon'
import IAstMaker from '../../src/IAstMaker'
import {
  traverseStep,
  traverseDocString
} from '../../src/cucumber-js.ts/JSONTraverse'
import IPredictableSupportCode from '../../src/IPredictableSupportCode'
import { messages } from '@cucumber/messages'

describe('traversing elements', () => {
  context('traverseStep', () => {
    const simpleStep: IStep = {
      keyword: 'Given ',
      line: 15,
      name: 'a step with a doctring:',
      result: {
        status: 'failed',
      },
      match: {
        location: "whatever.go:123"
      }
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
              cells: [ "name", "value"]
            },
            {
              cells: ["plic", "0"]
            },
            {
              cells: ["ploc", "1"]
            }
          ]
        }
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
      const docString = messages.GherkinDocument.Feature.Step.DocString.create()
      astMaker.makeDocstring.returns(docString)

      traverseStep(docStringStep, astMaker, () => 'the-id', supportCode)

      assert.deepEqual(astMaker.makeStep.getCall(0).args, [
        'the-id',
        15,
        'Given ',
        'a step with a doctring:',
        docString,
        null
      ])
    })

    it('builds the datatable using the astMaker', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()
      const datatable = messages.GherkinDocument.Feature.Step.DataTable.create()
      astMaker.makeDataTable.returns(datatable)

      traverseStep(datatableStep, astMaker, () => 'the-id', supportCode)

      assert.deepEqual(astMaker.makeStep.getCall(0).args, [
        'the-id',
        15,
        'Given ',
        'a step with a doctring:',
        null,
        datatable
      ])
    })

    it('registers the step in supportCode', () => {
      const astMaker = stubInterface<IAstMaker>()
      const supportCode = stubInterface<IPredictableSupportCode>()
      astMaker.makeStep.returns(messages.GherkinDocument.Feature.Step.create({
        id: 'a-random-step-id'
      }))

      traverseStep(simpleStep, astMaker, () => 'the-id', supportCode)

      assert.deepEqual(supportCode.addPredictableStepDefinition.getCall(0).args, [
        'whatever.go:123',
        'a-random-step-id',
        'failed',
        undefined
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
      assert.deepEqual(astMaker.makeDocstring.getCall(0).args, [
        null,
        '  This is some content',
      ])
    })
  })
})
