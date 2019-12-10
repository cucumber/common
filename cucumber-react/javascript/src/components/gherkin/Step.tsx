import React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from 'cucumber-messages'
import styled from 'styled-components'
import statusColor from './statusColor'
import { StepParam, H3, Indent, StepText, IStatusProps } from './html'
import CucumberQueryContext from '../../CucumberQueryContext'
import UriContext from '../../UriContext'

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

const ErrorMessage = styled.pre`
  padding: 0.5em;
  background-color: ${(props: IStatusProps) => statusColor(props.status).darken(0.1).hex()};
  overflow: scroll;
`

interface IProps {
  step: messages.GherkinDocument.Feature.IStep
}

const Step: React.FunctionComponent<IProps> = ({ step }) => {
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const uri = React.useContext(UriContext)

  const testResults = cucumberQuery.getStepResults(uri, step.location.line)
  const status = testResults.length > 0 ? testResults[0].status : messages.TestResult.Status.UNKNOWN
  const resultsWithMessage = testResults.filter(tr => tr.message)

  const stepTextElements: JSX.Element[] = []

  const args = cucumberQuery.getStepMatchArguments(uri, step.location.line)
  if(args) {
    // Step is defined
    let offset = 0
    args.forEach((argument, index) => {
      const plain = step.text.slice(offset, argument.group.start)
      if(plain.length > 0) {
        stepTextElements.push(<StepText key={`plain-${index}`}>{plain}</StepText>)
      }
      const arg = argument.group.value
      if(arg.length > 0) {
        stepTextElements.push(<StepParam key={`bold-${index}`} status={status}>{arg}</StepParam>)
      }
      offset += plain.length + arg.length
    })
    const plain = step.text.slice(offset)
    if(plain.length > 0) {
      stepTextElements.push(<StepText key={`plain-rest`}>{plain}</StepText>)
    }
  } else if(args.length === 2) {
    // Step is ambiguous
    stepTextElements.push(<StepText key={`plain-ambiguous`}>{step.text}</StepText>)
  } else {
    // Step is undefined
    stepTextElements.push(<StepText key={`plain-undefined`}>{step.text}</StepText>)
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
      {resultsWithMessage.map((result, i) => <ErrorMessage key={i} status={status}>{result.message}</ErrorMessage>)}
    </StepLi>
  )
}

export default Step
