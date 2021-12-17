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

const testDataWithCi: messages.Meta = {
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

export const WithCi = Template.bind({})
WithCi.args = {
  meta: testDataWithCi,
} as IExecutionSummaryProps
