import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'

import './custom-classes.scss'

import { components } from '..'
import { CustomRenderingSupport } from '../components/customise'

const { DocString } = components.gherkin
const { CucumberReact } = components

export default {
  title: 'Customisation/Classes',
  component: components.CucumberReact,
} as Meta

export const Classes: Story<{ support: CustomRenderingSupport; docString: messages.DocString }> = ({
  support,
  docString,
}) => {
  return (
    <>
      <h2>Default DocString:</h2>
      <DocString docString={docString} />
      <h2>With Custom Classes:</h2>
      <CucumberReact customRendering={support}>
        <DocString docString={docString} />
      </CucumberReact>
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
