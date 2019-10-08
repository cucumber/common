import React from 'react'
import { messages } from 'cucumber-messages'
import { Td } from './html'
import ResultsLookupByLineContext from '../../ResultsLookupByLineContext'
import styled from 'styled-components'
import statusColor from './statusColor'

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
  const resultsLookup = React.useContext(ResultsLookupByLineContext)

  return (
    <tbody>
    {rows.map((row, i) => {
      const testResults = resultsLookup(row.location.line)
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
