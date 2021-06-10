import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import Step from '../../../src/components/gherkin/Step'
import { JSDOM } from 'jsdom'

import UriContext from '../../../src/UriContext'
import GherkinQueryContext from '../../../src/GherkinQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import CucumberQueryContext from '../../../src/CucumberQueryContext'

describe('<Step>', () => {
  it('renders', () => {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const step: messages.Step = {
      keyword: 'Given',
      text: 'the 48 pixies',
      location: { column: 1, line: 1 },
      id: '123',
    }

    class StubCucumberQuery extends CucumberQuery {
      public getStepMatchArgumentsLists(): messages.StepMatchArgumentsList[] {
        return [
          {
            stepMatchArguments: [
              {
                group: {
                  start: 4,
                  value: '48',
                  children: [],
                },
              },
            ],
          },
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
            <Step step={step} hasExamples={false} />
          </CucumberQueryContext.Provider>
        </UriContext.Provider>
      </GherkinQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))

    // TODO a bit dom-specific - can we use snapshots to test this?
    const texts = Array.from(document.querySelectorAll('#content h3 > *')).map(
      (span) => span.textContent
    )
    assert.deepStrictEqual(texts, ['Given', 'the 48 pixies'])
  })
})
