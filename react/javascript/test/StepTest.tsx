import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { messages } from '@cucumber/messages'
import CucumberQuery from '@cucumber/query'
import Step from '../src/components/gherkin/Step'
import { JSDOM } from 'jsdom'

import UriContext from '../src/UriContext'
import GherkinQueryContext from '../src/GherkinQueryContext'
import { GherkinQuery } from '@cucumber/gherkin'
import CucumberQueryContext from '../src/CucumberQueryContext'

describe('Step', () => {
  it('renders', () => {
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
      public getStepMatchArgumentsLists(): messages.TestCase.TestStep.IStepMatchArgumentsList[] {
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
    }

    class StubGherkinQuery extends GherkinQuery {
      getPickleStepIds(): string[] {
        return ['dummy-id']
      }
    }

    const app = (
      <GherkinQueryContext.Provider value={new StubGherkinQuery()}>
        <UriContext.Provider value={'some.feature'}>
          <CucumberQueryContext.Provider value={new StubCucumberQuery()}>
            <Step
              step={step}
              renderStepMatchArguments={true}
              renderMessage={true}
            />
          </CucumberQueryContext.Provider>
        </UriContext.Provider>
      </GherkinQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))

    const plainTexts = Array.from(
      document.querySelectorAll('#content h3 span')
    ).map(a => a.innerHTML)
    assert.deepStrictEqual(plainTexts, ['Given', 'the ', ' pixies'])

    const paramTexts = Array.from(
      document.querySelectorAll('#content h3 a')
    ).map(a => a.innerHTML)
    assert.deepStrictEqual(paramTexts, ['48'])
  })
})
