import {schema as markdownSchema,} from 'prosemirror-markdown'
import {Schema} from 'prosemirror-model'
import {tableNodes} from 'prosemirror-tables'

// @ts-ignore
const heading = markdownSchema.spec.nodes.get('heading')
heading.attrs = {
  level: {default: 1},
  gherkinKeyword: {default: false}
}

// @ts-ignore
heading.toDOM = (node) => {
  const attrs = node.attrs.gherkinKeyword ? {class: 'gherkinKeyword'} : {}
  return ['h1', attrs, 0]
}


export default new Schema({
  // @ts-ignore
  nodes: markdownSchema.spec.nodes.append(
    tableNodes({
      tableGroup: 'block',
      // Examples suggest block+ but we want to restrict to a single paragraph (single line)
      // TODO: Investigate if we can restrict to a span, if such a thing exists in prosemirror.
      // We don't want users to add bold, italic etc (I think) to cells
      cellContent: 'paragraph',
      cellAttributes: {
        background: {
          default: null,
          getFromDOM(dom) {
            // @ts-ignore
            return (dom.style && dom.style.backgroundColor) || null
          },
          setDOMAttr(value, attrs) {
            // console.log('setDOMAttr', value, attrs)
            if (value) attrs.style = (attrs.style || '') + `background-color: ${value};`
          },
        },
      },
    })
  ),
  marks: markdownSchema.spec.marks,
})

