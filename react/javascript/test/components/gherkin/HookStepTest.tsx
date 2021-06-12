import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { JSDOM } from 'jsdom'

import UriContext from '../../../src/UriContext'
import GherkinQueryContext from '../../../src/GherkinQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import CucumberQueryContext from '../../../src/CucumberQueryContext'
import HookStep from '../../../src/components/gherkin/HookStep'

describe('<HookStep>', () => {
  it('doesnt explode when we cant find a hook message for a failed hook', () => {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const step: messages.TestStep = {
      id: '123',
      hookId: '456',
    }

    class StubCucumberQuery extends CucumberQuery {
      getTestStepResults(): messages.TestStepResult[] {
        return [
          {
            status: messages.TestStepResultStatus.FAILED,
            message: 'whoops',
            duration: {
              seconds: 1,
              nanos: 0,
            },
            willBeRetried: false,
          },
        ]
      }

      getHook(): messages.Hook {
        return null
      }
    }

    const app = (
      <GherkinQueryContext.Provider value={new GherkinQuery()}>
        <UriContext.Provider value={'some.feature'}>
          <CucumberQueryContext.Provider value={new StubCucumberQuery()}>
            <HookStep step={step} />
          </CucumberQueryContext.Provider>
        </UriContext.Provider>
      </GherkinQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))

    assert.strictEqual(
      document.getElementById('content').textContent.includes('Hook failed: Unknown location'),
      true
    )
  })
})
