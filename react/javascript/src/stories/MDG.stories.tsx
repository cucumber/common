import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { EnvelopesQuery, components } from '../../src'

import '../styles/styles.scss'

import markdown from '../../acceptance/markdown/markdown.feature.md'
import UriContext from '../UriContext'

const { QueriesWrapper } = components.app
const { MDG } = components.gherkin

export default {
  title: 'Gherkin/MDG',
  component: components.gherkin.GherkinDocument,
} as Meta

type Props = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}
type TemplateArgs = { envelopes: readonly messages.Envelope[] }

const Template: Story<TemplateArgs> = ({ envelopes }) => {
  const source = envelopes.filter((envelope) => envelope.source)[0].source
  return (
    <QueriesWrapper {...props(envelopes)}>
      <UriContext.Provider value={source.uri}>
        <MDG uri={source.uri}>{source.data}</MDG>
      </UriContext.Provider>
    </QueriesWrapper>
  )
}

export const Markdown = Template.bind({})
Markdown.args = {
  envelopes: markdown,
}

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
