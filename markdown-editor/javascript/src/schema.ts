import {schema as markdownSchema,} from 'prosemirror-markdown'
import {Schema} from 'prosemirror-model'
import {tableNodes} from 'prosemirror-tables'

// @ts-ignore
markdownSchema.spec.nodes.get('heading').attrs = {
  level: {default: 1},
  gherkin: {default: false},
}
// @ts-ignore
const listItem = markdownSchema.spec.nodes.get('list_item');
listItem.attrs = {
  gherkin: {default: false},
}
// @ts-ignore
// listItem.toDOM = (node) => {
//   const attrs = node.attrs.gherkin ? {class: 'gherkin'} : {}
//   console.log('new li', attrs)
//   return ["li", attrs, 0]
// }

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

