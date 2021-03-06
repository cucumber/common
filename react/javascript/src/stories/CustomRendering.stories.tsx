import React from 'react'
import { Meta, Story } from '@storybook/react'

import { messages } from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import GherkinDocumentList from '../components/app/GherkinDocumentList'
import QueriesWrapper from '../components/app/QueriesWrapper'
import { EnvelopesQuery } from '../EnvelopesQueryContext'

import '../styles/react-accessible-accordion.css'
import '../styles/styles.scss'

import attachments from '../../acceptance/attachments/attachments'
import CustomRendering, {
  CustomRenderingSupport,
} from '../components/customise/CustomRendering'

export default {
  title: 'CustomRendering',
  component: CustomRendering,
} as Meta

type Props = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}
type TemplateArgs = {
  envelopes: readonly messages.IEnvelope[]
  support: CustomRenderingSupport
}

const Template: Story<TemplateArgs> = ({ envelopes, support }) => {
  return (
    <CustomRendering support={support}>
      <QueriesWrapper {...props(envelopes)}>
        <GherkinDocumentList />
      </QueriesWrapper>
    </CustomRendering>
  )
}

export const Classes = Template.bind({})
Classes.args = {
  envelopes: attachments,
  support: {
    DocString: {
      docstring: 'custom-docstring',
    },
  },
}

export const Components = Template.bind({})
Components.args = {
  envelopes: attachments,
  support: {
    // eslint-disable-next-line react/display-name
    DocString: () => <>Hello world</>,
  },
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
