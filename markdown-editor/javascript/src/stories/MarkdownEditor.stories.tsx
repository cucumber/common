import React from 'react'
import {Meta, Story} from '@storybook/react'
import MarkdownEditor from "../MarkdownEditor";

export default {
  title: 'MarkdownEditor',
  component: MarkdownEditor,
} as Meta

type TemplateArgs = { content: string }

const Template: Story<TemplateArgs> = ({content}) => {
  return (
    <MarkdownEditor content={content}/>
  )
}

export const MDG = Template.bind({})
MDG.args = {
  content: `# Feature: Staying alive

This is about actually staying alive,
not the [Bee Gees song](https://www.youtube.com/watch?v=I_izvAbhExY).

## Rule: If you don't eat you die

![xkcd](https://imgs.xkcd.com/comics/lunch_2x.png)

### Scenario Outline: eating

* Given there are <start> cucumbers
* When I eat <eat> cucumbers
* Then I should have <left> cucumbers

#### Examples:

| start | eat | left |
| ----- | --- | ---- |
|    12 |   5 |    7 |
|    20 |   5 |   15 |
`
}
