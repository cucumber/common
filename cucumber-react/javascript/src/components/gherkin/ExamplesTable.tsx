import * as React from 'react'
import { messages } from 'cucumber-messages'
import ITableRow = messages.GherkinDocument.Feature.ITableRow

interface IProps {
  tableHeader: ITableRow
  tableBody: ITableRow[]
}

const ExamplesTable: React.FunctionComponent<IProps> = ({ tableHeader, tableBody }) => {
  return (
    <table>
      <thead>
      <tr>
        {(tableHeader.cells).map((cell, j) => (
          <th key={j}>
            <pre>{cell.value}</pre>
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {(tableBody).map((row, i) => (
        <tr key={i}>
          {(row.cells).map((cell, j) => (
            <td key={j}>
              <pre>{cell.value}</pre>
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default ExamplesTable
