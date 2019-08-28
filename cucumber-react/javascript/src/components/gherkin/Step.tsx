import React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from 'cucumber-messages'
import styled from 'styled-components'
import statusColor from './statusColor'
import ResultsLookupByLineContext from '../../ResultsLookupByLineContext'
import { H3, Indent, PlainWeightSpan } from './html'

interface IStepLiProps {
  status: messages.TestResult.Status
}

const StepLi = styled.li`
  padding: 0.5em;
  margin-left: 0;
  margin-top: 0;
  border-bottom: 1px #ccc solid;
  border-left: 1px #ccc solid;
  border-right: 1px #ccc solid;
  background-color: ${(props: IStepLiProps) => statusColor(props.status).hex()};

  &:nth-child(1) {
    border-top: 1px #ccc solid;
  }
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
      <H3>
        <Keyword>{step.keyword}</Keyword><PlainWeightSpan>{step.text}</PlainWeightSpan>
      </H3>
      <Indent>
        {step.dataTable && <DataTable dataTable={step.dataTable}/>}
        {step.docString && <DocString docString={step.docString}/>}
      </Indent>
    </StepLi>
  )
}

export default Step
