import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { messages } from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { JSDOM } from 'jsdom'

import UriContext from '../src/UriContext'
import GherkinQueryContext from '../src/GherkinQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import CucumberQueryContext from '../src/CucumberQueryContext'
import StepLine from '../src/components/gherkin/StepLine'

describe('<StepLine>', () => {
  it('renders', () => {
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
      public getStepMatchArgumentsLists(): messages.TestCase.TestStep.IStepMatchArgumentsList[] {
        return [
          new messages.TestCase.TestStep.StepMatchArgumentsList({
            stepMatchArguments: [
              new messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument({
                group: new messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group(
                  {
                    start: 4,
                    value: '48',
                    children: [],
                  }
                ),
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
            <StepLine step={step} renderStepMatchArguments={true} />
          </CucumberQueryContext.Provider>
        </UriContext.Provider>
      </GherkinQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))

    const plainTexts = Array.from(
      document.querySelectorAll('.cucumber-step__text, .cucumber-step__keyword')
    ).map((span) => span.textContent)
    assert.deepStrictEqual(plainTexts, ['Given', 'the ', ' pixies'])

    const paramTexts = Array.from(document.querySelectorAll('.cucumber-step__param')).map(
      (a) => a.textContent
    )
    assert.deepStrictEqual(paramTexts, ['48'])
  })
})
