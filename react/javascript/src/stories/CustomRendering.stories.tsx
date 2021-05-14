import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import GherkinDocumentList from '../components/app/GherkinDocumentList'
import QueriesWrapper from '../components/app/QueriesWrapper'
import { EnvelopesQuery } from '../EnvelopesQueryContext'

import '../styles/styles.scss'
import './custom-classes.scss'

import attachments from '../../acceptance/attachments/attachments.feature'
import CustomRendering, {
  CustomRenderingSupport,
  DocStringProps,
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
  envelopes: readonly messages.Envelope[]
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
    DocString: (props: DocStringProps) => (
      <>
        <p>I am going to render this doc string in a textarea:</p>
        <textarea>{props.docString.content}</textarea>
      </>
    ),
  },
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
