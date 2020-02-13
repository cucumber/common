import React from 'react'
import { messages } from '@cucumber/messages'
import CucumberQueryContext from '../../CucumberQueryContext'
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
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const uri = React.useContext(UriContext)

  const testStepResult = cucumberQuery.getWorstTestStepResult(
    cucumberQuery.getPickleTestStepResults(
      gherkinQuery.getPickleIds(uri, row.location.line)
    )
  )
  return (
    <>
      <tr className={`status-${statusName(testStepResult.status)}`}>
        <td>
          <StatusIcon status={testStepResult.status} />
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
        testStepResult={testStepResult}
        colSpan={row.cells.length}
      />
    </>
  )
}

interface IErrorMessageRowProps {
  testStepResult: messages.ITestStepResult
  colSpan: number
}

const ErrorMessageRow: React.FunctionComponent<IErrorMessageRowProps> = ({
  testStepResult,
  colSpan,
}) => {
  if (!testStepResult.message) return null
  return (
    <tr className={`status-${statusName(testStepResult.status)}`}>
      <td>&nbsp;</td>
      <td colSpan={colSpan}>
        <ErrorMessage message={testStepResult.message} />
      </td>
    </tr>
  )
}

export default ExamplesTableBody
