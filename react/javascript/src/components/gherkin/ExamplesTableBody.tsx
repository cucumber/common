import React from 'react'
import { messages } from '@cucumber/messages'
import statusColor from './statusColor'
import TestResultContext from '../../TestResultsQueryContext'
import UriContext from '../../UriContext'
import isNumber from './isNumber'
import GherkinQueryContext from '../../GherkinQueryContext'

interface IProps {
  rows: messages.GherkinDocument.Feature.ITableRow[]
}

const ExamplesTableBody: React.FunctionComponent<IProps> = ({ rows }) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const testResultQuery = React.useContext(TestResultContext)
  const uri = React.useContext(UriContext)

  return (
    <tbody>
      {rows.map((row, i) => {
        const testResult = testResultQuery.getWorstResult(
          testResultQuery.getAllPickleResults(
            gherkinQuery.getPickleIds(uri, row.location.line)
          )
        )

        return (
          <tr
            style={{ backgroundColor: statusColor(testResult.status).hex() }}
            key={i}
          >
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
