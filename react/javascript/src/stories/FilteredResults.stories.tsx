import React from 'react'
import { Meta, Story } from '@storybook/react'
import * as messages from '@cucumber/messages'

import { components } from '../../src'
import testData from '../../acceptance/examples-tables/examples-tables.feature'
import { CucumberReact } from '../components'

const { EnvelopesWrapper, SearchWrapper, FilteredResults } = components.app

export default {
  title: 'App/FilteredResults',
  component: components.app.FilteredResults,
} as Meta

type TemplateArgs = {
  envelopes: readonly messages.Envelope[]
}

const Template: Story<TemplateArgs> = ({ envelopes }) => {
  return (
    <CucumberReact>
      <EnvelopesWrapper envelopes={envelopes}>
        <SearchWrapper>
          <FilteredResults />
        </SearchWrapper>
      </EnvelopesWrapper>
    </CucumberReact>
  )
}

export const Default = Template.bind({})
Default.args = {
  envelopes: testData,
}
