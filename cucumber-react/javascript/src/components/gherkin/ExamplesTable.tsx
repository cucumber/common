import React from 'react'
import { messages } from 'cucumber-messages'
import TableBody from './TableBody'
import { Html, Th } from './html'
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
    <Html>
      <thead>
      <tr>
        {tableHeader.cells.map((cell, j) => (
          <Th key={j}>
            <pre>{cell.value}</pre>
          </Th>
        ))}
      </tr>
      </thead>
      <TableBody rows={tableBody || []}/>
    </Html>
  )
}

export default ExamplesTable
