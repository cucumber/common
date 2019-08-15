import * as React from "react"
import { messages } from "cucumber-messages"
import IDataTable = messages.GherkinDocument.Feature.Step.IDataTable

interface IProps {
  dataTable: IDataTable
}

const DataTable: React.FunctionComponent<IProps> = ({dataTable}) => {
  return (
    <table>
      <tbody>
      {(dataTable.rows || []).map((row, i) => (
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

export default DataTable
