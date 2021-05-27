import 'prosemirror-view/style/prosemirror.css'
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-menu/style/menu.css'
import 'prosemirror-tables/style/tables.css'

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
function addTable() {
  console.log('ADDED TABLE')
  return true
}

menu.splice(2, 0, [
  new MenuItem({ label: 'ADD TABLE', select: addTable, run: addTable }),
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
