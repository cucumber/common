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

export default {
  title: 'Themes & Customisation',
  component: components.customise.CustomRendering,
} as Meta

type Props = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}

export const Themes: Story = ({ envelopes, theme }) => {
  return (
    <>
      <h2>Dark Theme</h2>
      <components.customise.Theme theme={theme}>
        <components.app.QueriesWrapper {...props(envelopes)}>
          <components.app.GherkinDocumentList />
        </components.app.QueriesWrapper>
      </components.customise.Theme>
    </>
  )
}
Themes.args = {
  envelopes: [...attachments, ...rules],
  theme: 'dark',
}

export const Classes: Story = ({ support, docString }) => {
  return (
    <>
      <h2>Default DocString:</h2>
      <components.gherkin.DocString docString={docString} />
      <h2>With Custom Classes:</h2>
      <components.customise.CustomRendering support={support}>
        <components.gherkin.DocString docString={docString} />
      </components.customise.CustomRendering>
    </>
  )
}
Classes.args = {
  docString: {
    location: {
      column: 1,
      line: 1,
    },
    content: "Hello world, I'm a doc string!",
    delimiter: '`',
  },
  support: {
    DocString: {
      docString: 'custom-docstring',
    },
  },
}

export const CustomTagComponent: Story = ({ support, tags }) => {
  return (
    <>
      <h2>Tags with JIRA linking</h2>
      <components.customise.CustomRendering support={support}>
        <components.gherkin.Tags tags={tags} />
      </components.customise.CustomRendering>
    </>
  )
}

CustomTagComponent.args = {
  tags: [
    {
      location: {
        column: 1,
        line: 1,
      },
      name: '@foo',
    },
    {
      location: {
        column: 1,
        line: 1,
      },
      name: '@bar',
    },
    {
      location: {
        column: 1,
        line: 1,
      },
      name: '@PRODUCT-12345',
    },
  ],
  support: {
    // eslint-disable-next-line react/display-name
    Tags: (props: components.customise.TagsProps) => (
      <ul>
        {props.tags.map((tag, i) => {
          if (tag.name.match(/^@[A-Z]+-[0-9]+$/)) {
            return (
              <li key={i}>
                <a href={`https://jira.fake.co/${tag.name.substr(1)}`}>{tag.name}</a>
              </li>
            )
          }
          return <li key={i}>{tag.name}</li>
        })}
      </ul>
    ),
  },
}

export const CustomFeatureComponent: Story = ({ support, feature }) => {
  return (
    <>
      <h2>Feature with button on top</h2>
      <components.customise.CustomRendering support={support}>
        <components.gherkin.Feature feature={feature} />
      </components.customise.CustomRendering>
    </>
  )
}

const feature: messages.Feature = {
  keyword: 'Feature',
  name: 'My feature',
  children: [],
  tags: [],
  location: {
    column: 1,
    line: 1,
  },
  description: 'This\nis\nthe\ndescription',
  language: 'en',
}

CustomFeatureComponent.args = {
  feature: feature,
  support: {
    // eslint-disable-next-line react/display-name
    Feature: (props: components.customise.FeatureProps) => (
      <div>
        <button>Click me</button>
        <components.gherkin.Feature.DefaultRenderer {...props} />
      </div>
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
