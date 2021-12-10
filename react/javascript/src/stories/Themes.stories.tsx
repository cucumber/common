import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'

import '../styles/styles.scss'
import './custom-classes.scss'

import attachments from '../../acceptance/attachments/attachments.feature'
import rules from '../../acceptance/rules/rules.feature'

import { components, EnvelopesQuery } from '..'

const { QueriesWrapper, GherkinDocumentList } = components.app
const { Theme } = components.customise

export default {
  title: 'Customisation/Themes',
  component: components.customise.CustomRendering,
} as Meta

type Props = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}

export const Themes: Story<{ envelopes: messages.Envelope[]; theme: string }> = ({
  envelopes,
  theme,
}) => {
  return (
    <>
      <h2>Dark Theme</h2>
      <Theme theme={theme}>
        <QueriesWrapper {...props(envelopes)}>
          <GherkinDocumentList />
        </QueriesWrapper>
      </Theme>
    </>
  )
}
Themes.args = {
  envelopes: [...(attachments as messages.Envelope[]), ...(rules as messages.Envelope[])],
  theme: 'dark',
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
