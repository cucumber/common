import React from 'react'
import { render } from '@testing-library/react'
import { StatusesSummary } from '../../../src/components/app'
import * as messages from '@cucumber/messages'
import { TestStepResultStatus } from '@cucumber/messages'
import assert from 'assert'

describe('StatusesSummary', () => {
  it('should render correctly', () => {
    const { getAllByRole } = render(
      <StatusesSummary
        scenarioCountByStatus={
          new Map<messages.TestStepResultStatus, number>([
            [TestStepResultStatus.PASSED, 100],
            [TestStepResultStatus.FAILED, 3],
            [TestStepResultStatus.UNDEFINED, 1],
          ])
        }
        totalScenarioCount={104}
      />
    )

    assert.deepStrictEqual(
      getAllByRole('listitem').map((li) => li.textContent),
      ['3 failed', '100 passed', '1 undefined']
    )
  })
})
