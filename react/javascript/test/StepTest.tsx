import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { messages } from '@cucumber/messages'
import { StepMatchArgumentsQuery } from '@cucumber/query'
import Step from '../src/components/gherkin/Step'
import { JSDOM } from 'jsdom'
import StepMatchArgumentsQueryContext from '../src/StepMatchArgumentsQueryContext'
import UriContext from '../src/UriContext'
import GherkinQueryContext from '../src/GherkinQueryContext'
import { GherkinQuery } from '@cucumber/gherkin'

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

    class StubStepMatchArgumentsQuery extends StepMatchArgumentsQuery {
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
          <StepMatchArgumentsQueryContext.Provider
            value={new StubStepMatchArgumentsQuery()}
          >
            <Step step={step} renderStepMatchArguments={true} />
          </StepMatchArgumentsQueryContext.Provider>
        </UriContext.Provider>
      </GherkinQueryContext.Provider>
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
