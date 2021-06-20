import MarkdownIt from 'markdown-it'
import schema from "./schema";
import {defaultMarkdownParser, MarkdownParser,} from 'prosemirror-markdown'

export default function makeMarkdownParser(gherkinLines: readonly number[]) {
  const tokens = {
    ...defaultMarkdownParser.tokens,
    ...{
      heading: {
        block: "heading", getAttrs: (tok: any) => {
          const gherkin = gherkinLines.includes(tok.map[1])
          return {
            level: +tok.tag.slice(1),
            gherkin
          }
        }
      },

      table: {block: 'table'},
      // THEAD and TBODY don't exist in the prosemirror-tables schema
      thead: {ignore: true},
      tbody: {ignore: true},
      tr: {block: 'table_row'},
    },
  }

  const markdownParser = new MarkdownParser(schema, new MarkdownIt(), tokens)

  // @ts-ignore
  markdownParser.tokenHandlers['th_open'] = function (state) {
    // @ts-ignore
    state.openNode(schema.nodeType('table_header'))
    // @ts-ignore
    state.openNode(schema.nodeType('paragraph'))
  }

  // @ts-ignore
  markdownParser.tokenHandlers['th_close'] = function (state) {
    state.closeNode()
    state.closeNode()
  }

  // @ts-ignore
  markdownParser.tokenHandlers['td_open'] = function (state) {
    // @ts-ignore
    state.openNode(schema.nodeType('table_cell'))
    // @ts-ignore
    state.openNode(schema.nodeType('paragraph'))
  }

  // @ts-ignore
  markdownParser.tokenHandlers['td_close'] = function (state) {
    state.closeNode()
    state.closeNode()
  }

  return markdownParser
}
