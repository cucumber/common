import React from 'react'
import { Meta, Story } from '@storybook/react'
import * as messages from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'

import { EnvelopesQuery, components } from '../../src'
import testData from '../../acceptance/examples-tables/examples-tables.feature'

const { QueriesWrapper, FilteredResults } = components.app

export default {
  title: 'App/FilteredResults',
  component: components.app.FilteredResults,
} as Meta

function props(envelopes: readonly messages.Envelope[]): Props {
  const gherkinQuery = new GherkinQuery()
  const cucumberQuery = new CucumberQuery()
  const envelopesQuery = new EnvelopesQuery()
  for (const envelope of envelopes) {
    gherkinQuery.update(envelope)
    cucumberQuery.update(envelope)
    envelopesQuery.update(envelope)
  }
  return { gherkinQuery, cucumberQuery, envelopesQuery }
}

type Props = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}

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
