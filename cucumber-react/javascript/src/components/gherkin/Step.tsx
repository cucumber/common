import React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from 'cucumber-messages'
import styled from 'styled-components'
import statusColor from './statusColor'
import ResultsLookupByLineContext from '../../ResultsLookupByLineContext'
import { StepParam, H3, Indent, StepText } from './html'
import StepMatchLookupByLineContext from '../../StepMatchLookupByLineContext'

interface IStatusProps {
  status: messages.TestResult.Status
}

const StepLi = styled.li`
  padding: 0.5em;
  margin-left: 0;
  margin-top: 0;
  border-bottom: 1px #ccc solid;
  border-left: 1px #ccc solid;
  border-right: 1px #ccc solid;
  background-color: ${(props: IStatusProps) => statusColor(props.status).hex()};

  &:nth-child(1) {
    border-top: 1px #ccc solid;
  }
`

const ErrorMessage = styled.div`
  padding: 0.5em;
  background-color: ${(props: IStatusProps) => statusColor(props.status).darken(0.1).hex()};
`

interface IProps {
  step: messages.GherkinDocument.Feature.IStep
}

const Step: React.FunctionComponent<IProps> = ({ step }) => {
  const stepMatchLookup = React.useContext(StepMatchLookupByLineContext)
  const resultsLookup = React.useContext(ResultsLookupByLineContext)

  const testResults = resultsLookup(step.location.line)
  const status = testResults.length > 0 ? testResults[0].status : messages.TestResult.Status.UNKNOWN
  const resultsWithMessage = testResults.filter(tr => tr.message)

  const matches = stepMatchLookup(step.location.line)

  const stepTextElements: JSX.Element[] = []
  let offset = 0
  matches.forEach((match, index) => {
    const plain = step.text.slice(offset, match.group.start)
    if(plain.length > 0) {
      stepTextElements.push(<StepText key={`plain-${index}`}>{plain}</StepText>)
    }
    const arg = match.group.value
    if(arg.length > 0) {
      stepTextElements.push(<StepParam key={`bold-${index}`}>{arg}</StepParam>)
    }
    offset += plain.length + arg.length
  })
  const plain = step.text.slice(offset)
  if(plain.length > 0) {
    stepTextElements.push(<StepText key={`plain-rest`}>{plain}</StepText>)
  }

  return (
    <StepLi status={status}>
      <H3>
        <Keyword>{step.keyword}</Keyword>{stepTextElements}
      </H3>
      <Indent>
        {step.dataTable && <DataTable dataTable={step.dataTable}/>}
        {step.docString && <DocString docString={step.docString}/>}
      </Indent>
      {resultsWithMessage.map(result => <ErrorMessage status={status}>{result.message}</ErrorMessage>)}
    </StepLi>
  )
}

export default Step
