import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import CucumberMarkdownProseMirror from '../CucumberMarkdownProseMirror'
import { useProseMirror } from 'use-prosemirror'
import makeConfig from '../makeConfig'
import MarkdownSimpleCodeEditor from '../MarkdownSimpleCodeEditor'

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

export const MultipleScenarios = Template.bind({})
MultipleScenarios.args = {
  initialMarkdown: `# Feature: Multiple
bla bla
bla bla

# Scenario: One

bla

# ScenariX: Other header

lorem ipsum

# Scenario: Two

hi
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
