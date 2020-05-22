import React from 'react'
import { messages } from '@cucumber/messages'
import ExamplesTableBody from './ExamplesTableBody'
import ITableRow = messages.GherkinDocument.Feature.ITableRow

interface IProps {
  tableHeader: ITableRow
  tableBody: ITableRow[]
}

const ExamplesTable: React.FunctionComponent<IProps> = ({
  tableHeader,
  tableBody,
}) => {
  return (
    <table className="examples-table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          {tableHeader.cells.map((cell, j) => (
            <th key={j}>{cell.value}</th>
          ))}
        </tr>
      </thead>
      <ExamplesTableBody rows={tableBody || []} />
    </table>
  )
}

export default ExamplesTable
