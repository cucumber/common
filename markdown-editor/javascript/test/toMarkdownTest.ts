import { cucumberMarkdownSerializer, schema } from '../src/cucumberMarkdown'
import { DOMParser } from 'prosemirror-model'
import { JSDOM } from 'jsdom'

describe('toMarkdown', () => {
  it('writes markdown table', () => {
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
    console.log(JSON.stringify(doc.toJSON(), null, 2))

    const markdown = cucumberMarkdownSerializer.serialize(doc)

    console.log(markdown)
  })
})
