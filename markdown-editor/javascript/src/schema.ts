import {schema as markdownSchema,} from 'prosemirror-markdown'
import {Schema} from 'prosemirror-model'
import {tableNodes} from 'prosemirror-tables'

// @ts-ignore
const nodes = markdownSchema.spec.nodes.append(
  tableNodes({
    tableGroup: 'block',
    cellContent: 'paragraph',
    cellAttributes: {},
  })
)

// Update node specs to include a gherkin attribute which defaults to false
for(const nodeName of ['heading', 'list_item']) {
  nodes.get(nodeName).attrs = { ...nodes.get(nodeName).attrs, gherkin: { default: false } }
}

export default new Schema({
  nodes,
  marks: markdownSchema.spec.marks,
})

