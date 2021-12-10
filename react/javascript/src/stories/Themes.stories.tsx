import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'

import '../styles/styles.scss'
import './custom-classes.scss'

import attachments from '../../acceptance/attachments/attachments.feature'
import rules from '../../acceptance/rules/rules.feature'

import { components } from '..'
import { props } from './helpers'

const { QueriesWrapper, GherkinDocumentList } = components.app
const { Theme } = components.customise

export default {
  title: 'Customisation/Themes',
  component: components.customise.CustomRendering,
} as Meta

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
