import * as React from "react"
import { messages } from "cucumber-messages"
import ITableRow = messages.GherkinDocument.Feature.ITableRow

interface IProps {
  tableHeader?: ITableRow | null
  tableBody?: ITableRow[] | null
}

const ExamplesTable: React.FunctionComponent<IProps> = ({tableHeader, tableBody}) => {
  if (!tableHeader) {
    return null
  }
  return (
    <table>
      <thead>
      <th>
        {(tableHeader.cells || []).map((cell, j) => (
          <td key={j}>
            <pre>{cell.value}</pre>
          </td>
        ))}
      </th>
      </thead>
      <tbody>
      {(tableBody || []).map((row, i) => (
        <tr key={i}>
          {(row.cells || []).map((cell, j) => (
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
