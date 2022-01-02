import React from 'react'
import { Meta, Story } from '@storybook/react'
import * as messages from '@cucumber/messages'
import { TestStepResultStatus } from '@cucumber/messages'

import { components } from '../../src'
import { IStatusesSummaryProps } from '../components/app'
import { CucumberReact } from '../components'

const { StatusesSummary } = components.app

export default {
  title: 'App/StatusesSummary',
  component: components.app.StatusesSummary,
} as Meta

const Template: Story<IStatusesSummaryProps> = (props) => {
  return (
    <CucumberReact>
      <StatusesSummary {...props} />
    </CucumberReact>
  )
}

export const Typical = Template.bind({})
Typical.args = {
  scenarioCountByStatus: new Map<messages.TestStepResultStatus, number>([
    [TestStepResultStatus.PASSED, 100],
    [TestStepResultStatus.FAILED, 3],
    [TestStepResultStatus.UNDEFINED, 1],
  ]),
  totalScenarioCount: 104,
} as IStatusesSummaryProps

export const All = Template.bind({})
All.args = {
  scenarioCountByStatus: new Map<messages.TestStepResultStatus, number>([
    [TestStepResultStatus.PASSED, 3],
    [TestStepResultStatus.FAILED, 3],
    [TestStepResultStatus.PENDING, 3],
    [TestStepResultStatus.SKIPPED, 3],
    [TestStepResultStatus.UNDEFINED, 3],
    [TestStepResultStatus.AMBIGUOUS, 3],
    [TestStepResultStatus.UNKNOWN, 3],
  ]),
  totalScenarioCount: 21,
} as IStatusesSummaryProps
