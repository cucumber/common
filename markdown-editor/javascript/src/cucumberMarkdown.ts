import MarkdownIt from 'markdown-it'
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
  MarkdownParser,
  schema as markdownSchema,
} from 'prosemirror-markdown'
import {Schema} from 'prosemirror-model'
import {tableNodes} from 'prosemirror-tables'
import {prettyTable, Table} from "./prettyFork";

export const schema = new Schema({
  // @ts-ignore
  nodes: markdownSchema.spec.nodes.append(
    tableNodes({
      tableGroup: 'block',
      // Examples suggest block+ but we want to restrict to a single paragraph (single line)
      // TODO: Investigate if we can restrict to a span, if such a thing exists in prosemirror
      cellContent: 'paragraph',
      cellAttributes: {
        background: {
          default: null,
          getFromDOM(dom) {
            // @ts-ignore
            return (dom.style && dom.style.backgroundColor) || null
          },
          setDOMAttr(value, attrs) {
            if (value) attrs.style = (attrs.style || '') + `background-color: ${value};`
          },
        },
      },
    })
  ),
  marks: markdownSchema.spec.marks,
})

const tokens = {
  ...defaultMarkdownParser.tokens,
  ...{
    table: { block: 'table' },
    // THEAD and TBODY don't exist in the prosemirror-tables schema
    thead: { ignore: true },
    tbody: { ignore: true },
    tr: { block: 'table_row' },
  },
}
export const cucumberMarkdownParser = new MarkdownParser(schema, new MarkdownIt(), tokens)

// @ts-ignore
cucumberMarkdownParser.tokenHandlers['th_open'] = function (state) {
  // @ts-ignore
  state.openNode(schema.nodeType('table_header'))
  // @ts-ignore
  state.openNode(schema.nodeType('paragraph'))
}

// @ts-ignore
cucumberMarkdownParser.tokenHandlers['th_close'] = function (state) {
  state.closeNode()
  state.closeNode()
}

// @ts-ignore
cucumberMarkdownParser.tokenHandlers['td_open'] = function (state) {
  // @ts-ignore
  state.openNode(schema.nodeType('table_cell'))
  // @ts-ignore
  state.openNode(schema.nodeType('paragraph'))
}

// @ts-ignore
cucumberMarkdownParser.tokenHandlers['td_close'] = function (state) {
  state.closeNode()
  state.closeNode()
}

export const cucumberMarkdownSerializer = defaultMarkdownSerializer
cucumberMarkdownSerializer.nodes['table'] = (state, node) => {
  const table: Table = node.toJSON().content.map((row: any) => {
    return row.content.map((row: any) => {
      return row.content[0].content[0].text
    })
  })
  const markdownTable = prettyTable(table, 0, 'markdown')
  state.text(markdownTable)
}
