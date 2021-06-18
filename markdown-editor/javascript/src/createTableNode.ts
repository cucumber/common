import {Fragment, Schema, Node } from "prosemirror-model";
import { EditorState } from "prosemirror-state";

export default function createTableNode<S extends Schema>(state: EditorState<S>): Node {
  const tableHeader: Node = state.schema.nodes.table_header.create(
    null,
    state.schema.nodes.paragraph.create(
      null,
      state.schema.text('h')
    )
  )
  const tableCell: Node = state.schema.nodes.table_cell.create(
    null,
    state.schema.nodes.paragraph.create(
      null,
      state.schema.text('c')
    )
  )
  return state.schema.nodes.table.create(
    null,
    Fragment.fromArray([
      state.schema.nodes.table_row.create(null, Fragment.fromArray([tableHeader, tableHeader, tableHeader])),
      state.schema.nodes.table_row.create(null, Fragment.fromArray([tableCell, tableCell, tableCell])),
      state.schema.nodes.table_row.create(null, Fragment.fromArray([tableCell, tableCell, tableCell])),
    ])
  );
}
