import React from 'react'
import { render } from '@testing-library/react'
import { ExecutionSummary, IExecutionSummaryProps } from '../../../src/components/app'
import * as messages from '@cucumber/messages'
import { TestStepResultStatus, TimeConversion } from '@cucumber/messages'
import assert from 'assert'
import { add, addMilliseconds } from 'date-fns'

const DEFAULT_PROPS: IExecutionSummaryProps = {
  scenarioCountByStatus: new Map<messages.TestStepResultStatus, number>([
    [TestStepResultStatus.PASSED, 100],
    [TestStepResultStatus.FAILED, 3],
    [TestStepResultStatus.UNDEFINED, 1],
  ]),
  totalScenarioCount: 104,
  testRunStarted: {
    timestamp: {
      seconds: 1639753096,
      nanos: 870,
    },
  },
  testRunFinished: {
    timestamp: {
      seconds: 1639753197,
      nanos: 340,
    },
    success: true,
  },
  meta: {
    protocolVersion: '17.1.1',
    implementation: { version: '8.0.0-rc.1', name: 'cucumber-js' },
    cpu: { name: 'x64' },
    os: { name: 'linux', version: '5.11.0-1022-azure' },
    runtime: { name: 'node.js', version: '16.13.1' },
    ci: {
      name: 'GitHub Actions',
      url: 'https://github.com/cucumber/cucumber-js/actions/runs/1592557391',
      buildNumber: '1592557391',
      git: {
        revision: 'b53d820504b31c8e4d44234dc5eaa58d6b7fdd4c',
        remote: 'https://github.com/cucumber/cucumber-js.git',
        branch: 'main',
      },
    },
  },
}

const startDate = new Date(
  TimeConversion.timestampToMillisecondsSinceEpoch(DEFAULT_PROPS.testRunStarted.timestamp)
)

describe('ExecutionSummary', () => {
  describe('last run date/time', () => {
    const examples: [text: string, referenceDate: Date][] = [
      ['1 hour ago', add(startDate, { hours: 1 })],
      ['3 hours ago', add(startDate, { hours: 3, minutes: 24, seconds: 18 })],
      ['1 day ago', add(startDate, { days: 1, hours: 3, minutes: 24, seconds: 18 })],
      ['15 days ago', add(startDate, { weeks: 2, days: 1 })],
    ]

    for (const [text, referenceDate] of examples) {
      it(`should render correctly for ${text}`, () => {
        const { getByText } = render(
          <ExecutionSummary {...DEFAULT_PROPS} referenceDate={referenceDate} />
        )

        assert.ok(getByText(text))
        assert.ok(getByText('last run'))
      })
    }
  })

  describe('run duration', () => {
    const examples: [text: string, finishDate: Date][] = [
      ['1 hour 45 minutes 23 seconds', add(startDate, { hours: 1, minutes: 45, seconds: 23 })],
      ['12 minutes 15 seconds', add(startDate, { minutes: 12, seconds: 15 })],
      ['10 seconds', add(startDate, { seconds: 10.01 })],
      ['9.88 seconds', addMilliseconds(startDate, 9876)],
      ['6.54 seconds', addMilliseconds(startDate, 6543)],
    ]

    for (const [text, finishDate] of examples) {
      it(`should render correctly for ${text}`, () => {
        const { getByText } = render(
          <ExecutionSummary
            {...DEFAULT_PROPS}
            testRunFinished={{
              timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(finishDate.getTime()),
              success: true,
            }}
          />
        )

        assert.ok(getByText(text))
        assert.ok(getByText('duration'))
      })
    }
  })
})
