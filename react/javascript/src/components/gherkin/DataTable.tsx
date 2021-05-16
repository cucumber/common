import React from 'react'
import styles from './DataTable.module.scss'
import {
  DataTableClasses,
  DataTableProps,
  useCustomRendering,
} from '../customise/CustomRendering'
import * as messages from '@cucumber/messages'
import isNumber from './isNumber'
import HighLight from '../app/HighLight'

const TableBody: React.FunctionComponent<{
  rows: readonly messages.TableRow[]
}> = ({ rows }) => {
  return (
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          {(row.cells || []).map((cell, j) => (
            <td key={j} style={{ textAlign: isNumber(cell.value) ? 'right' : 'left' }}>
              <HighLight text={cell.value} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

const DataTable: React.FunctionComponent<DataTableProps> = (props) => {
  const Customised = useCustomRendering<DataTableProps, DataTableClasses>('DataTable', styles)
  if (typeof Customised === 'function') {
    return <Customised {...props}/>
  }
  return (
    <table className={Customised.table}>
      <TableBody rows={props.dataTable.rows || []} />
    </table>
  )
}

export default DataTable
