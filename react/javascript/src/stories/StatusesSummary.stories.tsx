import React from 'react'
import { Meta, Story } from '@storybook/react'
import * as messages from '@cucumber/messages'
import { TestStepResultStatus } from '@cucumber/messages'

import { components } from '../../src'
import { IStatusesSummaryProps } from '../components/app'

const { StatusesSummary } = components.app

export default {
  title: 'StatusesSummary',
  component: components.app.StatusesSummary,
} as Meta

const Template: Story<IStatusesSummaryProps> = (props) => {
  return (
    <div className="cucumber">
      <StatusesSummary {...props} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  scenarioCountByStatus: new Map<messages.TestStepResultStatus, number>([
    [TestStepResultStatus.PASSED, 100],
    [TestStepResultStatus.FAILED, 3],
    [TestStepResultStatus.UNDEFINED, 1],
  ]),
  totalScenarioCount: 104,
} as IStatusesSummaryProps
