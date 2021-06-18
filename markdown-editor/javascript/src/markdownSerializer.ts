import {prettyTable, Table} from "./prettyFork";
import {defaultMarkdownSerializer,} from 'prosemirror-markdown'

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
