import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import CucumberMarkdownProseMirror from '../components/CucumberMarkdownProseMirror'
import { useProseMirror } from 'use-prosemirror'
import makeConfig from '../makeConfig'
import MarkdownSimpleCodeEditor from '../components/MarkdownSimpleCodeEditor'

export default {
  title: 'CucumberMarkdownProseMirror',
  component: CucumberMarkdownProseMirror,
} as Meta

type TemplateArgs = { initialMarkdown: string }

const Template: Story<TemplateArgs> = ({ initialMarkdown }) => {
  const [markdown, setMarkdown] = useState(initialMarkdown)
  const [state, setState] = useProseMirror(makeConfig(markdown || ''))

  return (
    <div>
      <CucumberMarkdownProseMirror state={state} setState={setState} setMarkdown={setMarkdown} />
      <MarkdownSimpleCodeEditor markdown={markdown} setMarkdown={setMarkdown} setState={setState} />
    </div>
  )
}

export const EmptyDocument = Template.bind({})
EmptyDocument.args = {
  initialMarkdown: ``,
}

export const Bullets = Template.bind({})
Bullets.args = {
  initialMarkdown: `# Feature: Multiple

* NOPE
* NAY

# Scenario: One

* Given YES
* When HEY
`,
}

export const DataTables = Template.bind({})
DataTables.args = {
  initialMarkdown: `# Feature: Welcome

Let's use some tables

## Scenario: some tables

* Given the following people

  | Name  | Number |
  | ----- | ------ |
  | Jill  |      1 |
  | Bob   |     10 |
  | Sally |    100 |
`,
}
