import ReactDOM from 'react-dom'
import React from 'react'
import Step from '../src/components/gherkin/Step'
import { messages } from 'cucumber-messages'
import * as assert from 'assert'
import CucumberQuery from 'cucumber-query'
import CucumberQueryContext from '../src/CucumberQueryContext'

describe('Step', () => {
  it('renders', () => {
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
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
      getStepMatchArguments(uri: string, lineNumber: number): messages.IStepMatchArgument[] {
        return [
          new messages.StepMatchArgument({
            group: new messages.StepMatchArgument.Group({
              start: 4,
              value: '48',
              children: [],
            }),
          }),
        ]
      }
    }

    const app = <CucumberQueryContext.Provider value={new StubCucumberQuery()}>
      <Step step={step}/>
    </CucumberQueryContext.Provider>
    ReactDOM.render(app, document.getElementById('content'))

    assert.strictEqual(document.querySelector('#content h3 > span:nth-child(2)').innerHTML, 'the ')
    assert.strictEqual(document.querySelector('#content h3 > span:nth-child(3)').innerHTML, '48')
    assert.strictEqual(document.querySelector('#content h3 > span:nth-child(4)').innerHTML, ' pixies')
  })
})
