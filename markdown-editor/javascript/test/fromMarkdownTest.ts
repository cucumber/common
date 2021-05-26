import { cucumberMarkdownParser, cucumberMarkdownSerializer } from '../src/cucumberMarkdown'

describe('fromMarkdown', () => {
  it('parses markdown table', () => {
    const markdown = `# Hello

| COL1 | COL2 | 
| ---- | ---- | 
| One | Two | 
| Un | Deux | 
| En | To |
`
    const doc = cucumberMarkdownParser.parse(markdown)
    const newMarkdown = cucumberMarkdownSerializer.serialize(doc)
    console.log(newMarkdown)

    // console.log(JSON.stringify(doc.toJSON(), null, 2))
  })
})
