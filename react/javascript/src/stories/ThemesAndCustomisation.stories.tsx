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
import rules from '../../acceptance/rules/rules.feature'
import {
  TagsProps,
} from '../components/customise/CustomRendering'
import Theme from '../components/customise/Theme'
import DocString from '../components/gherkin/DocString'
import CustomRendering from '../components/customise/CustomRendering'
import Tags from '../components/gherkin/Tags'

export default {
  title: 'Themes & Customisation',
  component: CustomRendering,
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
      <Theme theme={theme}>
        <QueriesWrapper {...props(envelopes)}>
          <GherkinDocumentList />
        </QueriesWrapper>
      </Theme>
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
      <DocString docString={docString} />
      <h2>With Custom Classes:</h2>
      <CustomRendering support={support}>
        <DocString docString={docString} />
      </CustomRendering>
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

export const Components: Story = ({ support, tags }) => {
  return (
    <>
      <h2>Tags with JIRA linking</h2>
      <CustomRendering support={support}>
        <Tags tags={tags} />
      </CustomRendering>
    </>
  )
}
Components.args = {
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
    Tags: (props: TagsProps) => (
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
