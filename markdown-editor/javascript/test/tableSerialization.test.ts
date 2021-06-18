import assert from 'assert'
import { JSDOM } from 'jsdom'
import {
  cucumberMarkdownParser,
  cucumberMarkdownSerializer,
  schema
} from '../src/cucumberMarkdown'
import { DOMParser } from 'prosemirror-model'

describe('table serialization', () => {
  it('can serialize a table', () => {
    const documentElement = new JSDOM(
      `<table>
<tr><th>COL1</th><th>COL2</th></tr>
<tr><td>Un</td><td>1</td></tr>
<tr><td>Dix</td><td>10</td></tr>
<tr><td>Cent</td><td>100</td></tr>
</table>`
    ).window.document.documentElement
    const parser = DOMParser.fromSchema(schema)
    const doc = parser.parse(documentElement)

    const markdown = cucumberMarkdownSerializer.serialize(doc)

    const expectedMarkdown = `| COL1 | COL2 |
| ---- | ---- |
| Un   |    1 |
| Dix  |   10 |
| Cent |  100 |
`
    assert.strictEqual(markdown, expectedMarkdown)
  })

  it('can parse a markdown table and serialize it back to the original', () => {
    const markdown = `# Hello

| COL1 | COL2 |
| ---- | ---- |
| One  | Two  |
| Un   | Deux |
| En   | To   |
`
    const doc = cucumberMarkdownParser.parse(markdown)
    const newMarkdown = cucumberMarkdownSerializer.serialize(doc)
    assert.strictEqual(newMarkdown, markdown)
  })
})
