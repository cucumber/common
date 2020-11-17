import React from 'react'
import { Meta, Story } from '@storybook/react'

import { messages } from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import GherkinDocumentList from '../components/app/GherkinDocumentList'
import QueriesWrapper from '../components/app/QueriesWrapper'
import { EnvelopesQuery } from '../EnvelopesQueryContext'
import GherkinDocument from '../components/gherkin/GherkinDocument'

import '../styles/react-accessible-accordion.css'
import '../styles/styles.scss'

import attachments from '../../acceptance/attachments/attachments'
import dataTables from '../../acceptance/data-tables/data-tables'
import examplesTables from '../../acceptance/examples-tables/examples-tables'
import hooks from '../../acceptance/hooks/hooks'
import minimal from '../../acceptance/minimal/minimal'
import parameterTypes from '../../acceptance/parameter-types/parameter-types'
import rules from '../../acceptance/rules/rules'
import stacktTraces from '../../acceptance/stack-traces/stack-traces'
import unknownParameterTypes from '../../acceptance/unknown-parameter-type/unknown-parameter-type'

export default {
  title: 'GherkinDocument',
  component: GherkinDocument,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

type Props = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}
type TemplateArgs = { envelopes: readonly messages.IEnvelope[] }

const Template: Story<TemplateArgs> = ({ envelopes }) => {
  return (
    <QueriesWrapper {...props(envelopes)}>
      <GherkinDocumentList />
    </QueriesWrapper>
  )
}

export const Attachments = Template.bind({})
Attachments.args = {
  envelopes: attachments,
}

export const DataTables = Template.bind({})
DataTables.args = {
  envelopes: dataTables,
}

export const ExamplesTables = Template.bind({})
ExamplesTables.args = {
  envelopes: examplesTables,
}

export const Hooks = Template.bind({})
Hooks.args = {
  envelopes: hooks,
}

export const Minimal = Template.bind({})
Minimal.args = {
  envelopes: minimal,
}

export const ParameterTypes = Template.bind({})
ParameterTypes.args = {
  envelopes: parameterTypes,
}

export const Rules = Template.bind({})
Rules.args = {
  envelopes: rules,
}

export const StackTraces = Template.bind({})
StackTraces.args = {
  envelopes: stacktTraces,
}

export const UnknownParameterTypes = Template.bind({})
UnknownParameterTypes.args = {
  envelopes: unknownParameterTypes,
}

function props(envelopes: readonly messages.IEnvelope[]): Props {
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
