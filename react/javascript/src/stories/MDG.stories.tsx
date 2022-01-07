import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'
import { components } from '../../src'

import markdown from '../../acceptance/markdown/markdown.feature.md'
import UriContext from '../UriContext'
import { CucumberReact } from '../components'

const { EnvelopesWrapper } = components.app
const { MDG } = components.gherkin

export default {
  title: 'Gherkin/MDG',
  component: components.gherkin.GherkinDocument,
} as Meta

type TemplateArgs = { envelopes: readonly messages.Envelope[] }

const Template: Story<TemplateArgs> = ({ envelopes }) => {
  const source = envelopes.filter((envelope) => envelope.source)[0].source
  return (
    <CucumberReact>
      <EnvelopesWrapper envelopes={envelopes}>
        <UriContext.Provider value={source.uri}>
          <MDG uri={source.uri}>{source.data}</MDG>
        </UriContext.Provider>
      </EnvelopesWrapper>
    </CucumberReact>
  )
}

export const Markdown = Template.bind({})
Markdown.args = {
  envelopes: markdown,
}
