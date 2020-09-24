import React from 'react'
import { messages } from '@cucumber/messages'
import ExamplesTableBody from './ExamplesTableBody'

interface IProps {
  tableHeader: messages.GherkinDocument.Feature.ITableRow
  tableBody: messages.GherkinDocument.Feature.ITableRow[]
}

const ExamplesTable: React.FunctionComponent<IProps> = ({
  tableHeader,
  tableBody,
}) => {
  return (
    <table className="cucumber-table cucumber-examples-table">
      <thead>
        <tr>
          <th className="cucumber-table__header-cell">&nbsp;</th>
          {tableHeader.cells.map((cell, j) => (
            <th className="cucumber-table__header-cell" key={j}>
              {cell.value}
            </th>
          ))}
        </tr>
      </thead>
      <ExamplesTableBody rows={tableBody || []} />
    </table>
  )
}

export default ExamplesTable
