import MarkdownIt from 'markdown-it'
import schema from "./schema";
import {defaultMarkdownParser, MarkdownParser, TokenConfig,} from 'prosemirror-markdown'
import Token from 'markdown-it/lib/token';

export default function makeMarkdownParser(gherkinLines: readonly number[]) {
  const tokens: Record<string,TokenConfig> = {
    ...defaultMarkdownParser.tokens,
    ...{
      table: {block: 'table'},
      // THEAD and TBODY don't exist in the prosemirror-tables schema
      thead: {ignore: true},
      tbody: {ignore: true},
      tr: {block: 'table_row'},
    },
  }

  // Add gherkin property to attrs
  for(const tokenName of ['heading', 'list_item']) {
    const token = tokens[tokenName]
    const getAttrs = token.getAttrs
    token.getAttrs = (token: Token) => {
      const attrs = getAttrs ? getAttrs(token) : {}
      const lineNumber = token.map[0] + 1
      attrs.gherkin = gherkinLines.includes(lineNumber)
      return attrs
    }
  }

  // @ts-ignore
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

// @ts-ignore
function listIsTight(tokens, i) {
  while (++i < tokens.length)
    if (tokens[i].type != "list_item_open") return tokens[i].hidden
  return false
}
