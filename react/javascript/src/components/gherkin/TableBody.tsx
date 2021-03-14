import React from 'react'
import * as messages from '@cucumber/messages'
import isNumber from './isNumber'
import HighLight from '../app/HighLight'

interface IProps {
  rows: readonly messages.TableRow[]
}

const TableBody: React.FunctionComponent<IProps> = ({ rows }) => {
  return (
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          {(row.cells || []).map((cell, j) => (
            <td
              className="cucumber-table__cell"
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

export default TableBody
