import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'

import attachments from '../../acceptance/attachments/attachments.feature'
import rules from '../../acceptance/rules/rules.feature'

import { components } from '..'
import { IncludedTheme } from '../components/customise'

const { EnvelopesWrapper, GherkinDocumentList } = components.app
const { CucumberReact } = components

export default {
  title: 'Customisation/Themes',
  component: components.CucumberReact,
} as Meta

export const Themes: Story<{ envelopes: messages.Envelope[]; theme: IncludedTheme }> = ({
  envelopes,
  theme,
}) => {
  return (
    <>
      <h2>`{theme}` Theme</h2>
      <CucumberReact theme={theme}>
        <EnvelopesWrapper envelopes={envelopes}>
          <GherkinDocumentList />
        </EnvelopesWrapper>
      </CucumberReact>
    </>
  )
}
Themes.args = {
  envelopes: [...(attachments as messages.Envelope[]), ...(rules as messages.Envelope[])],
  theme: 'dark',
}
