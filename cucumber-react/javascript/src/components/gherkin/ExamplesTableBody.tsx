import React from 'react'
import { messages } from 'cucumber-messages'
import statusColor from './statusColor'
import CucumberQueryContext from '../../CucumberQueryContext'
import UriContext from '../../UriContext'
import isNumber from './isNumber'

interface IProps {
  rows: messages.GherkinDocument.Feature.ITableRow[]
}

interface ITrProps {
  status: messages.TestResult.Status
}

const ExamplesTableBody: React.FunctionComponent<IProps> = ({ rows }) => {
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const uri = React.useContext(UriContext)

  return (
    <tbody>
      {rows.map((row, i) => {
        // TODO: cucumberQuery.getRowResults???
        const testResults = cucumberQuery.getStepResults(uri, row.location.line)
        const status =
          testResults.length > 0
            ? testResults[0].status
            : messages.TestResult.Status.UNKNOWN
        return (
          <tr style={{ backgroundColor: statusColor(status).hex() }} key={i}>
            {(row.cells || []).map((cell, j) => (
              <td
                key={j}
                style={{ textAlign: isNumber(cell.value) ? 'right' : 'left' }}
              >
                {cell.value}
              </td>
            ))}
          </tr>
        )
      })}
    </tbody>
  )
}

export default ExamplesTableBody
