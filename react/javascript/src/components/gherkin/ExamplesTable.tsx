import React from 'react'
import * as messages from '@cucumber/messages'
import { getWorstTestStepResult } from '@cucumber/messages'
import defaultStyles from './DataTable.module.scss'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import UriContext from '../../UriContext'
import StatusIcon from './StatusIcon'
import isNumber from './isNumber'
import ErrorMessage from './ErrorMessage'
import {
  DefaultComponent,
  ExamplesTableClasses,
  ExamplesTableProps,
  useCustomRendering,
} from '../customise/CustomRendering'

const DefaultRenderer: DefaultComponent<ExamplesTableProps, ExamplesTableClasses> = ({
  tableHeader,
  tableBody,
  styles,
}) => {
  return (
    <table className={styles.examplesTable}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          {tableHeader.cells.map((cell, j) => (
            <th key={j}>{cell.value}</th>
          ))}
        </tr>
      </thead>
      <ExamplesTableBody rows={tableBody || []} detailClass={styles.detailRow} />
    </table>
  )
}

const ExamplesTable: React.FunctionComponent<ExamplesTableProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<ExamplesTableProps, ExamplesTableClasses>(
    'ExamplesTable',
    defaultStyles,
    DefaultRenderer
  )
  return <ResolvedRenderer {...props} />
}

const ExamplesTableBody: React.FunctionComponent<{
  rows: readonly messages.TableRow[]
  detailClass?: string
}> = ({ rows, detailClass }) => {
  return (
    <tbody>
      {rows.map((row, i) => (
        <RowOrRows row={row} key={i} detailClass={detailClass} />
      ))}
    </tbody>
  )
}

const RowOrRows: React.FunctionComponent<{
  row: messages.TableRow
  detailClass?: string
}> = ({ row, detailClass }) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const uri = React.useContext(UriContext)

  const testStepResult = getWorstTestStepResult(
    cucumberQuery.getPickleTestStepResults(gherkinQuery.getPickleIds(uri, row.id))
  )
  return (
    <>
      <tr>
        <td>
          <StatusIcon status={testStepResult.status} />
        </td>
        {row.cells.map((cell, j) => (
          <td key={j} style={{ textAlign: isNumber(cell.value) ? 'right' : 'left' }}>
            {cell.value}
          </td>
        ))}
      </tr>
      <ErrorMessageRow
        key="row-error"
        className={detailClass}
        testStepResult={testStepResult}
        colSpan={row.cells.length}
      />
    </>
  )
}

interface IErrorMessageRowProps {
  testStepResult: messages.TestStepResult
  colSpan: number
  className?: string
}

const ErrorMessageRow: React.FunctionComponent<IErrorMessageRowProps> = ({
  testStepResult,
  colSpan,
  className,
}) => {
  if (!testStepResult.message) return null
  return (
    <tr className={className}>
      <td>&nbsp;</td>
      <td colSpan={colSpan}>
        <ErrorMessage message={testStepResult.message} />
      </td>
    </tr>
  )
}

export default ExamplesTable
