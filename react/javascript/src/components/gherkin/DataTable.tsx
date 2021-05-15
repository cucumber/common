import React, { useContext } from 'react'
import styles from './DataTable.module.scss'
import { CustomRenderingContext, DataTableProps, mixinStyles } from '../customise/CustomRendering'
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
          <td
            key={j}
            style={{ textAlign: isNumber(cell.value) ? 'right' : 'left' }}
          >
            <HighLight text={cell.value} />
          </td>
        ))}
      </tr>
    ))}
    </tbody>
  )
}

const DataTable: React.FunctionComponent<DataTableProps> = ({ dataTable }) => {
  const { DataTable: Custom } = useContext(CustomRenderingContext)
  if (typeof Custom === 'function') {
    return <Custom dataTable={dataTable}/>
  }
  const composedStyles = mixinStyles(styles, Custom)
  return (
    <table className={composedStyles.table}>
      <TableBody rows={dataTable.rows || []} />
    </table>
  )
}

export default DataTable
