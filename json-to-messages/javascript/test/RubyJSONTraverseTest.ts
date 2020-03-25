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

    it('calls AstMaker.makeFeature', () => {
      const astMaker = stubInterface<IAstMaker>()
      traverseFeature(emptyFeature, astMaker)

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

      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeFeatureChild.returns(gherkinScenario)
      traverseFeature(feature, astMaker)

      assert.deepEqual(astMaker.makeFeature.getCall(0).args, [
        2,
        'Feature',
        'My feature',
        'It does things and stuff',
        [gherkinScenario],
      ])
    })

    it('calls AtMaker.makeGherkinDocument with the generated feature', () => {
      const gherkinFeature = messages.GherkinDocument.Feature.create({
        name: 'My awesome feature',
      })
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeFeature.returns(gherkinFeature)
      traverseFeature(feature, astMaker)

      assert.deepStrictEqual(astMaker.makeGherkinDocument.getCall(0).args, [
        'path/to/some.feature',
        gherkinFeature,
      ])
    })
  })

  describe('traverseElement', () => {
    const background: IElement = {
      id: 'my-background',
      type: 'background',
      keyword: 'Background',
      name: '',
      description: 'This background doe not much stuff',
      line: 3,
      steps: [],
    }

    it('calls AstMaker.makeFeatureChild with the correct data', () => {
      const astMaker = stubInterface<IAstMaker>()
      traverseElement(background, astMaker)

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
      const astMaker = stubInterface<IAstMaker>()
      astMaker.makeStep.returns(step)

      traverseElement(scenario, astMaker)
      assert.deepStrictEqual(astMaker.makeFeatureChild.getCall(0).args[5], [
        step,
      ])
    })

    xit('forward the ID of the element to traverseHook')
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
      traverseStep(simpleStep, astMaker)

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
      traverseStep(docStringStep, astMaker)

      assert.notStrictEqual(astMaker.makeStep.getCall(0).args[3], null)
    })

    it('passes on datatable is available', () => {
      const astMaker = stubInterface<IAstMaker>()
      traverseStep(datatableStep, astMaker)

      assert.notStrictEqual(astMaker.makeStep.getCall(0).args[4], null)
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
