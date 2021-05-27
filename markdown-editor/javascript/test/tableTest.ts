import assert from 'assert'
import { JSDOM } from 'jsdom'
import {cucumberMarkdownParser, cucumberMarkdownSerializer, schema} from '../src/cucumberMarkdown'
import {DOMParser} from 'prosemirror-model'

describe('fromMarkdown', () => {
  it('roundtrips markdown table', () => {
    const markdown = `# Hello

| COL1 | COL2 |
| ---- | ---- |
| One | Two |
| Un | Deux |
| En | To |
`
    const doc = cucumberMarkdownParser.parse(markdown)
    const newMarkdown = cucumberMarkdownSerializer.serialize(doc)
    assert.strictEqual(newMarkdown, markdown)
  })

  it('serializes markdown table', () => {
    const documentElement = new JSDOM(
      `<table>
<tr><th>COL1</th><th>COL2</th></tr>
<tr><td>One</td><td>Two</td></tr>
<tr><td>Un</td><td>Deux</td></tr>
<tr><td>En</td><td>To</td></tr>
</table>`
    ).window.document.documentElement
    const parser = DOMParser.fromSchema(schema)
    const doc = parser.parse(documentElement)

    const markdown = cucumberMarkdownSerializer.serialize(doc)

    const expectedMarkdown = `| COL1 | COL2 |
| ---- | ---- |
| One | Two |
| Un | Deux |
| En | To |
`
    assert.strictEqual(markdown, expectedMarkdown)

  })
})
