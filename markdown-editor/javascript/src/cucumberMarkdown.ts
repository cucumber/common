import MarkdownIt from 'markdown-it'
import {
  defaultMarkdownSerializer,
  MarkdownParser,
  schema as markdownSchema,
} from 'prosemirror-markdown'
import { Schema } from 'prosemirror-model'
import { tableNodes } from 'prosemirror-tables'

export const schema = new Schema({
  // @ts-ignore
  nodes: markdownSchema.spec.nodes.append(
    tableNodes({
      tableGroup: 'block',
      // Examples suggest block+ but we want to be more restrictive - ideally just text
      cellContent: 'paragraph',
      cellAttributes: {
        background: {
          default: null,
          getFromDOM(dom) {
            // @ts-ignore
            return dom.style.backgroundColor || null
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

function listIsTight(tokens: any[], i: number) {
  while (++i < tokens.length) if (tokens[i].type != 'list_item_open') return tokens[i].hidden
  return false
}

// TODO: Simplify when/if this is released: https://github.com/ProseMirror/prosemirror-markdown/pull/54
export const cucumberMarkdownParser = new MarkdownParser(schema, new MarkdownIt(), {
  blockquote: { block: 'blockquote' },
  paragraph: { block: 'paragraph' },
  list_item: { block: 'list_item' },
  bullet_list: {
    block: 'bullet_list',
    // @ts-ignore
    getAttrs: (_: any, tokens: any[], i: number) => ({ tight: listIsTight(tokens, i) }),
  },
  ordered_list: {
    // @ts-ignore
    block: 'ordered_list',
    getAttrs: (tok, tokens, i) => ({
      order: +tok.attrGet('start') || 1,
      tight: listIsTight(tokens, i),
    }),
  },
  heading: { block: 'heading', getAttrs: (tok) => ({ level: +tok.tag.slice(1) }) },
  code_block: { block: 'code_block', noCloseToken: true },
  fence: {
    block: 'code_block',
    getAttrs: (tok) => ({ params: tok.info || '' }),
    noCloseToken: true,
  },
  hr: { node: 'horizontal_rule' },
  image: {
    node: 'image',
    getAttrs: (tok) => ({
      src: tok.attrGet('src'),
      title: tok.attrGet('title') || null,
      alt: (tok.children[0] && tok.children[0].content) || null,
    }),
  },
  hardbreak: { node: 'hard_break' },

  em: { mark: 'em' },
  strong: { mark: 'strong' },
  link: {
    mark: 'link',
    getAttrs: (tok) => ({
      href: tok.attrGet('href'),
      title: tok.attrGet('title') || null,
    }),
  },
  code_inline: { mark: 'code', noCloseToken: true },
  // GFM Table support:
  table: { block: 'table' },
  // THEAD and TBODY don't exist in the prosemirror-tables schema
  thead: { ignore: true },
  tbody: { ignore: true },
  tr: { block: 'table_row' },
})

// @ts-ignore
cucumberMarkdownParser.tokenHandlers['th_open'] = function (state) {
  // @ts-ignore
  state.openNode(schema.nodeType('table_cell'))
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
cucumberMarkdownSerializer.nodes['table'] = (state, tableNode) => {
  state.renderContent(tableNode)
}
cucumberMarkdownSerializer.nodes['table_row'] = (state, cell) => {
  state.renderContent(cell)
  state.text(' | \n')
}
cucumberMarkdownSerializer.nodes['table_header'] = (state, node) => {
  state.text(' | ')
  node.forEach((n) => {
    state.renderContent(n)
  })
}
cucumberMarkdownSerializer.nodes['table_cell'] = (state, node) => {
  state.text(' | ')
  node.forEach((n) => {
    state.renderContent(n)
  })
}
