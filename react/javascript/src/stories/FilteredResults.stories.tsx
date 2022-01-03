import React from 'react'
import { Meta, Story } from '@storybook/react'
import * as messages from '@cucumber/messages'

import { components } from '../../src'
import testData from '../../acceptance/examples-tables/examples-tables.feature'
import { props } from './helpers'
import { CucumberReact } from '../components'
import { IncludedTheme } from '../components/customise'

const { QueriesWrapper, FilteredResults } = components.app

export default {
  title: 'App/FilteredResults',
  component: components.app.FilteredResults,
} as Meta

type TemplateArgs = {
  envelopes: readonly messages.Envelope[]
  theme: IncludedTheme
}

const Template: Story<TemplateArgs> = ({ envelopes, theme }) => {
  return (
    <CucumberReact theme={theme}>
      <QueriesWrapper {...props(envelopes)}>
        <FilteredResults />
      </QueriesWrapper>
    </CucumberReact>
  )
}

export const Default = Template.bind({})
Default.args = {
  envelopes: testData,
  theme: 'default',
}
