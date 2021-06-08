import 'prosemirror-view/style/prosemirror.css'
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-menu/style/menu.css'
import 'prosemirror-tables/style/tables.css'
import './styles.css'

import React from 'react'
import { ProseMirror, useProseMirror } from 'use-prosemirror'
// @ts-ignore
import { buildMenuItems, exampleSetup } from 'prosemirror-example-setup'
import {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  columnResizing,
  deleteColumn,
  deleteRow,
  deleteTable,
  goToNextCell,
  mergeCells,
  setCellAttr,
  splitCell,
  tableEditing,
  toggleHeaderCell,
  toggleHeaderColumn,
  toggleHeaderRow,
} from 'prosemirror-tables'
import { keymap } from 'prosemirror-keymap'
import { Dropdown, MenuItem } from 'prosemirror-menu'
import { cucumberMarkdownParser, schema } from './cucumberMarkdown'
import { EditorState, TextSelection, Transaction } from 'prosemirror-state'
import { Fragment, Node, Schema } from 'prosemirror-model'

const menu = buildMenuItems(schema).fullMenu

function item(label: string, cmd: any) {
  return new MenuItem({ label, select: cmd, run: cmd })
}

const tableMenu = [
  item('Insert column before', addColumnBefore),
  item('Insert column after', addColumnAfter),
  item('Delete column', deleteColumn),
  item('Insert row before', addRowBefore),
  item('Insert row after', addRowAfter),
  item('Delete row', deleteRow),
  item('Delete table', deleteTable),
  item('Merge cells', mergeCells),
  item('Split cell', splitCell),
  item('Toggle header column', toggleHeaderColumn),
  item('Toggle header row', toggleHeaderRow),
  item('Toggle header cells', toggleHeaderCell),
  item('Make cell green', setCellAttr('background', '#dfd')),
  item('Make cell not-green', setCellAttr('background', null)),
]

// TODO: Adapt one of these:
// https://gitlab.coko.foundation/wax/wax-prosemirror/-/blob/master/wax-prosemirror-components/src/ui/tables/InsertTableTool.js
// https://github.com/chanzuckerberg/czi-prosemirror/blob/master/src/ui/TableGridSizeEditor.js
// https://discuss.prosemirror.net/t/how-co-create-table/3510/3

function insertTable<S extends Schema = any>(
  state: EditorState<S>,
  dispatch?: (tr: Transaction<S>) => void
): boolean {
  if (dispatch) {
    const offset: number = state.tr.selection.anchor + 1
    const header: Node = state.schema.nodes.table_header.createAndFill()
    const cell: Node = state.schema.nodes.table_cell.createAndFill()
    const node: Node = state.schema.nodes.table.create(
      null,
      Fragment.fromArray([
        state.schema.nodes.table_row.create(null, Fragment.fromArray([header, header, header])),
        state.schema.nodes.table_row.create(null, Fragment.fromArray([cell, cell, cell])),
        state.schema.nodes.table_row.create(null, Fragment.fromArray([cell, cell, cell])),
      ])
    )

    const transaction: Transaction = state.tr
    dispatch(
      transaction
        .replaceSelectionWith(node)
        .scrollIntoView()
        .setSelection(TextSelection.near(transaction.doc.resolve(offset)))
    )
  }

  return true
}

menu.splice(2, 0, [
  new MenuItem({
    label: 'Add table',
    title: 'Insert table',
    class: 'ProseMirror-icon',
    run: insertTable,
  }),
  new Dropdown(tableMenu, { label: 'Table' }),
])

const MarkdownEditor: React.FunctionComponent<{ content: string }> = ({ content }) => {
  const [state, setState] = useProseMirror({
    doc: cucumberMarkdownParser.parse(content),
    plugins: [
      columnResizing({}),
      tableEditing(),
      keymap({
        Tab: goToNextCell(1),
        'Shift-Tab': goToNextCell(-1),
      }),
    ].concat(exampleSetup({ schema, menuContent: menu })),
  })
  return <ProseMirror state={state} onChange={(newState) => setState(newState)} />
}

export default MarkdownEditor
