import React from 'react'
import { messages } from 'cucumber-messages'
import TableBody from './TableBody'
import { Table, Th } from './html'
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
      <TableBody rows={tableBody || []}/>
    </Table>
  )
}

export default ExamplesTable
