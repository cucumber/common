import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { GherkinQuery } from '@cucumber/gherkin'
import { messages } from '@cucumber/messages'
import CucumberQuery from '@cucumber/query'
import CucumberQueryContext from '../src/CucumberQueryContext'
import Step from '../src/components/gherkin/Step'

describe('Step', () => {
  it('renders', () => {
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM(
      '<html lang="en"><body><div id="content"></div></body></html>'
    )
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const step = new messages.GherkinDocument.Feature.Step({
      keyword: 'Given',
      text: 'the 48 pixies',
      location: new messages.Location({ column: 1, line: 1 }),
    })

    class StubCucumberQuery extends CucumberQuery {
      public getStepMatchArgumentsLists(
        uri: string,
        lineNumber: number
      ): messages.TestCase.TestStep.IStepMatchArgumentsList[] {
        return [
          new messages.TestCase.TestStep.StepMatchArgumentsList({
            stepMatchArguments: [
              new messages.StepMatchArgument({
                group: new messages.StepMatchArgument.Group({
                  start: 4,
                  value: '48',
                  children: [],
                }),
              }),
            ],
          }),
        ]
      }

      public getStepResults(
        uri: string,
        lineNumber: number
      ): messages.ITestResult[] {
        return []
      }
    }

    const app = (
      <CucumberQueryContext.Provider
        value={new StubCucumberQuery(new GherkinQuery())}
      >
        <Step step={step} renderStepMatchArguments={true} />
      </CucumberQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))

    assert.strictEqual(
      document.querySelector('#content h3 > span:nth-child(2)').innerHTML,
      'the '
    )
    assert.strictEqual(
      document.querySelector('#content h3 > span:nth-child(3)').innerHTML,
      '48'
    )
    assert.strictEqual(
      document.querySelector('#content h3 > span:nth-child(4)').innerHTML,
      ' pixies'
    )
  })
})
