import React from 'react'
import { Meta, Story } from '@storybook/react'
import * as messages from '@cucumber/messages'

import { components } from '../../src'
import { IExecutionSummaryProps } from '../components/app'

const { ExecutionSummary } = components.app

const testData: messages.Meta = {
  protocolVersion: '17.1.1',
  implementation: { version: '8.0.0-rc.1', name: 'cucumber-js' },
  cpu: { name: 'x64' },
  os: { name: 'darwin', version: '21.1.0' },
  runtime: { name: 'node.js', version: '12.22.1' },
  ci: null,
}

export default {
  title: 'App/ExecutionSummary',
  component: components.app.ExecutionSummary,
} as Meta

const Template: Story<IExecutionSummaryProps> = (props) => {
  return (
    <div className="cucumber">
      <ExecutionSummary {...props} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  meta: testData,
} as IExecutionSummaryProps
