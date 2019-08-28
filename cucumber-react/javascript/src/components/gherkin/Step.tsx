import React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from 'cucumber-messages'
import styled from 'styled-components'
import statusColor from './statusColor'
import ResultsLookupByLineContext from '../../ResultsLookupByLineContext'

interface IStepLiProps {
  status: messages.TestResult.Status
}

const StepLi = styled.li`
  background-color: ${(props: IStepLiProps) => statusColor(props.status).hex()};
`

interface IProps {
  step: messages.GherkinDocument.Feature.IStep
}

const Step: React.FunctionComponent<IProps> = ({ step }) => {
  const resultsLookup = React.useContext(ResultsLookupByLineContext)

  const testResults = resultsLookup(step.location.line)
  const status = testResults.length > 0 ? testResults[0].status : messages.TestResult.Status.UNKNOWN

  return (
    <StepLi status={status}>
      <Keyword>{step.keyword}</Keyword>
      <span>{step.text}</span>
      {step.dataTable && <DataTable dataTable={step.dataTable}/>}
      {step.docString && <DocString docString={step.docString}/>}
    </StepLi>
  )
}

export default Step
