import React from 'react'
import { messages } from 'cucumber-messages'
import { Table, Th } from './html'
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
    <Table>
      <thead>
      <tr>
        {tableHeader.cells.map((cell, j) => (
          <Th key={j}>
            {cell.value}
          </Th>
        ))}
      </tr>
      </thead>
      <ExamplesTableBody rows={tableBody || []}/>
    </Table>
  )
}

export default ExamplesTable
