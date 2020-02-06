import React from 'react'
import { messages } from '@cucumber/messages'
import TestResultContext from '../../TestResultsQueryContext'
import UriContext from '../../UriContext'
import isNumber from './isNumber'
import GherkinQueryContext from '../../GherkinQueryContext'
import ErrorMessage from './ErrorMessage'
import statusName from './statusName'
import StatusIcon from './StatusIcon'

interface IProps {
  rows: messages.GherkinDocument.Feature.ITableRow[]
}

const ExamplesTableBody: React.FunctionComponent<IProps> = ({ rows }) => {
  return (
    <tbody>
      {rows.map((row, i) => (
        <RowOrRows row={row} key={i} />
      ))}
    </tbody>
  )
}

interface IRowOrRows {
  row: messages.GherkinDocument.Feature.ITableRow
}

const RowOrRows: React.FunctionComponent<IRowOrRows> = ({ row }) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const testResultQuery = React.useContext(TestResultContext)
  const uri = React.useContext(UriContext)

  const testResult = testResultQuery.getWorstResult(
    testResultQuery.getPickleResults(
      gherkinQuery.getPickleIds(uri, row.location.line)
    )
  )
  return (
    <>
      <tr className={`status-${statusName(testResult.status)}`}>
        <td>
          <StatusIcon status={testResult.status} />
        </td>
        {row.cells.map((cell, j) => (
          <td
            key={j}
            style={{ textAlign: isNumber(cell.value) ? 'right' : 'left' }}
          >
            {cell.value}
          </td>
        ))}
      </tr>
      <ErrorMessageRow
        key="row-error"
        testResult={testResult}
        colSpan={row.cells.length}
      />
    </>
  )
}

interface IErrorMessageRowProps {
  testResult: messages.ITestResult
  colSpan: number
}

const ErrorMessageRow: React.FunctionComponent<IErrorMessageRowProps> = ({
  testResult,
  colSpan,
}) => {
  if (!testResult.message) return null
  return (
    <tr className={`status-${statusName(testResult.status)}`}>
      <td>&nbsp;</td>
      <td colSpan={colSpan}>
        <ErrorMessage message={testResult.message} />
      </td>
    </tr>
  )
}

export default ExamplesTableBody
