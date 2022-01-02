import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'

import { components } from '..'
import { CustomRenderingSupport } from '../components/customise'

const { Tags, Feature } = components.gherkin
const { CucumberReact } = components

export default {
  title: 'Customisation/Components',
  component: components.CucumberReact,
} as Meta

export const CustomTagComponent: Story<{
  support: CustomRenderingSupport
  tags: messages.Tag[]
}> = ({ support, tags }) => {
  return (
    <>
      <h2>Tags with JIRA linking</h2>
      <CucumberReact customRendering={support}>
        <Tags tags={tags} />
      </CucumberReact>
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
      id: '1',
    },
    {
      location: {
        column: 1,
        line: 1,
      },
      name: '@bar',
      id: '1',
    },
    {
      location: {
        column: 1,
        line: 1,
      },
      name: '@PRODUCT-12345',
      id: '1',
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

export const CustomFeatureComponent: Story<{
  support: CustomRenderingSupport
  feature: messages.Feature
}> = ({ support, feature }) => {
  return (
    <>
      <h2>Feature with button on top</h2>
      <CucumberReact customRendering={support}>
        <Feature feature={feature} />
      </CucumberReact>
    </>
  )
}

CustomFeatureComponent.args = {
  feature: {
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
  },
  support: {
    // eslint-disable-next-line react/display-name
    Feature: (props) => (
      <div>
        <button>Click me</button>
        <props.DefaultRenderer {...props} />
      </div>
    ),
  },
}
