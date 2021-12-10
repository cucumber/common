import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'

import '../styles/styles.scss'
import './custom-classes.scss'

import { components } from '..'
import { CustomRenderingSupport } from '../components/customise'

const { DocString } = components.gherkin
const { CustomRendering } = components.customise

export default {
  title: 'Customisation/Classes',
  component: components.customise.CustomRendering,
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
