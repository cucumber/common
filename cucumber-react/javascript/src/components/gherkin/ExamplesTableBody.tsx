import React from 'react'
import { messages } from 'cucumber-messages'
import { Td } from './html'
import styled from 'styled-components'
import statusColor from './statusColor'
import CucumberQueryContext from '../../CucumberQueryContext'
import UriContext from '../../UriContext'

interface IProps {
  rows: messages.GherkinDocument.Feature.ITableRow[]
}

interface ITrProps {
  status: messages.TestResult.Status
}

const Tr = styled.tr`
  background-color: ${(props: ITrProps) => statusColor(props.status).hex()};
`

const ExamplesTableBody: React.FunctionComponent<IProps> = ({ rows }) => {
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const uri = React.useContext(UriContext)

  return (
    <tbody>
    {rows.map((row, i) => {
      // TODO: cucumberQuery.getRowResults???
      const testResults = cucumberQuery.getStepResults(uri, row.location.line)
      const status = testResults.length > 0 ? testResults[0].status : messages.TestResult.Status.UNKNOWN
      return (
        <Tr key={i} status={status}>
          {(row.cells || []).map((cell, j) => (
            <Td key={j}>{cell.value}</Td>
          ))}
        </Tr>
      )
    })}
    </tbody>
  )
}

export default ExamplesTableBody
