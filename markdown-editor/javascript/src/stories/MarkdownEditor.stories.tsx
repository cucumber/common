import React from 'react'
import { Meta, Story } from '@storybook/react'
import MarkdownEditor from '../MarkdownEditor'

export default {
  title: 'MarkdownEditor',
  component: MarkdownEditor,
} as Meta

type TemplateArgs = { content: string }

const Template: Story<TemplateArgs> = ({ content }) => {
  return <MarkdownEditor content={content} />
}

export const Tables = Template.bind({})
Tables.args = {
  content: `# Welcome
Bla bla

| COL1 | COL2 | 
| ---- | ---- | 
| One | Two | 
| Un | Deux | 
| En | To |
`,
}
