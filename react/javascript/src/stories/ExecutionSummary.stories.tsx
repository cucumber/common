import React from 'react'
import { Meta, Story } from '@storybook/react'
import * as messages from '@cucumber/messages'
import {
  TestRunFinished,
  TestRunStarted,
  TestStepResultStatus,
  TimeConversion,
} from '@cucumber/messages'
import { components } from '../../src'
import { IExecutionSummaryProps } from '../components/app'
import { CucumberReact } from '../components'

const { ExecutionSummary } = components.app

const scenarioCountByStatus = new Map<messages.TestStepResultStatus, number>([
  [TestStepResultStatus.PASSED, 100],
  [TestStepResultStatus.FAILED, 3],
  [TestStepResultStatus.UNDEFINED, 1],
])

const metaMinimal: messages.Meta = {
  protocolVersion: '17.1.1',
  implementation: { version: '8.0.0-rc.1', name: 'cucumber-js' },
  cpu: { name: 'x64' },
  os: { name: 'linux', version: '5.11.0-1022-azure' },
  runtime: { name: 'node.js', version: '16.13.1' },
  ci: null,
}

const metaWithCi: messages.Meta = {
  ...metaMinimal,
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
}

const testRunStarted: TestRunStarted = {
  timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(1639753096000),
}

const testRunFinished: TestRunFinished = {
  timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(1639753197000),
  success: false,
}

export default {
  title: 'App/ExecutionSummary',
  component: components.app.ExecutionSummary,
} as Meta

const Template: Story<IExecutionSummaryProps> = (props) => {
  return (
    <CucumberReact>
      <ExecutionSummary {...props} />
    </CucumberReact>
  )
}

export const Default = Template.bind({})

Default.args = {
  scenarioCountByStatus,
  totalScenarioCount: 104,
  testRunStarted,
  testRunFinished,
  meta: metaMinimal,
} as IExecutionSummaryProps

export const WithCi = Template.bind({})
WithCi.args = {
  scenarioCountByStatus,
  totalScenarioCount: 104,
  testRunStarted,
  testRunFinished,
  meta: metaWithCi,
} as IExecutionSummaryProps
