import assert from 'assert'
import React from 'react'
import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import HookStep from '../../../src/components/gherkin/HookStep'
import { render } from '../utils'

describe('<HookStep>', () => {
  it('doesnt explode when we cant find a hook message for a failed hook', () => {
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

    const { container } = render(<HookStep step={step} />, {
      cucumberQuery: new StubCucumberQuery(),
    })

    assert.strictEqual(container.textContent.includes('Hook failed: Unknown location'), true)
  })
})
