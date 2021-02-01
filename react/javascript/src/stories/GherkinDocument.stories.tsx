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

import attachments from '../../acceptance/attachments/attachments.feature'
import dataTables from '../../acceptance/data-tables/data-tables.feature'
import examplesTables from '../../acceptance/examples-tables/examples-tables.feature'
import hooks from '../../acceptance/hooks/hooks.feature'
import markdown from '../../acceptance/markdown/markdown.md'
import minimal from '../../acceptance/minimal/minimal.feature'
import parameterTypes from '../../acceptance/parameter-types/parameter-types.feature'
import rules from '../../acceptance/rules/rules.feature'
import stackTraces from '../../acceptance/stack-traces/stack-traces.feature'
import unknownParameterTypes from '../../acceptance/unknown-parameter-type/unknown-parameter-type.feature'
import MarkdownDocumentList from '../components/app/MarkdownDocumentList'

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

const PlainTemplate: Story<TemplateArgs> = ({ envelopes }) => {
  return (
    <QueriesWrapper {...props(envelopes)}>
      <GherkinDocumentList />
    </QueriesWrapper>
  )
}

const MarkdownTemplate: Story<TemplateArgs> = ({ envelopes }) => {
  return (
    <QueriesWrapper {...props(envelopes)}>
      <MarkdownDocumentList />
    </QueriesWrapper>
  )
}

export const Attachments = PlainTemplate.bind({})
Attachments.args = {
  envelopes: attachments,
}

export const DataTables = PlainTemplate.bind({})
DataTables.args = {
  envelopes: dataTables,
}

export const ExamplesTables = PlainTemplate.bind({})
ExamplesTables.args = {
  envelopes: examplesTables,
}

export const Hooks = PlainTemplate.bind({})
Hooks.args = {
  envelopes: hooks,
}

export const MarkdownPlain = PlainTemplate.bind({})
MarkdownPlain.args = {
  envelopes: markdown,
}

export const Markdown = MarkdownTemplate.bind({})
Markdown.args = {
  envelopes: markdown,
}

export const Minimal = PlainTemplate.bind({})
Minimal.args = {
  envelopes: minimal,
}

export const ParameterTypes = PlainTemplate.bind({})
ParameterTypes.args = {
  envelopes: parameterTypes,
}

export const Rules = PlainTemplate.bind({})
Rules.args = {
  envelopes: rules,
}

export const StackTraces = PlainTemplate.bind({})
StackTraces.args = {
  envelopes: stackTraces,
}

export const UnknownParameterTypes = PlainTemplate.bind({})
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
