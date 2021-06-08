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

export const DataTables = Template.bind({})
DataTables.args = {
  content: `# Feature: Welcome
Let's use some tables

## Scenario: some tables

* Given the following people
  | Name | Age |
  | ---- | ---- |
  | Jill |   1 |
  | Bob | 10 |
  | Sally | 100 |
`,
}
