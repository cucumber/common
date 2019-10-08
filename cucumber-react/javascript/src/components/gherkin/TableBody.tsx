import React from 'react'
import { messages } from 'cucumber-messages'
import { Td } from './html'

interface IProps {
  rows: messages.GherkinDocument.Feature.ITableRow[]
}

const TableBody: React.FunctionComponent<IProps> = ({ rows }) => {
  return (
    <tbody>
    {rows.map((row, i) => (
      <tr key={i}>
        {(row.cells || []).map((cell, j) => (
          <Td key={j}>{cell.value}</Td>
        ))}
      </tr>
    ))}
    </tbody>
  )
}

export default TableBody
