import React from 'react'
import { Meta, Story } from '@storybook/react'
import * as messages from '@cucumber/messages'

import { components } from '../../src'
import testData from '../../acceptance/examples-tables/examples-tables.feature'
import { props } from './helpers'

const { QueriesWrapper, FilteredResults } = components.app

export default {
  title: 'App/FilteredResults',
  component: components.app.FilteredResults,
} as Meta

type TemplateArgs = {
  envelopes: readonly messages.Envelope[]
}

const Template: Story<TemplateArgs> = ({ envelopes }) => {
  return (
    <QueriesWrapper {...props(envelopes)}>
      <FilteredResults />
    </QueriesWrapper>
  )
}

export const Default = Template.bind({})
Default.args = {
  envelopes: testData,
}
