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

const ErrorMessage = styled.pre`
  padding: 0.5em;
  background-color: ${(props: IStatusProps) =>
    statusColor(props.status)
      .darken(0.1)
      .hex()};
  overflow: scroll;
`

interface IProps {
  step: messages.GherkinDocument.Feature.IStep
  renderStepMatchArguments: boolean
}

const Step: React.FunctionComponent<IProps> = ({
  step,
  renderStepMatchArguments,
}) => {
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const uri = React.useContext(UriContext)

  const testResults = cucumberQuery.getStepResults(uri, step.location.line)
  const status =
    testResults.length > 0
      ? testResults[0].status
      : messages.TestResult.Status.UNKNOWN
  const resultsWithMessage = testResults.filter(tr => tr.message)

  const stepTextElements: JSX.Element[] = []

  if (renderStepMatchArguments) {
    const stepMatchArgumentsLists = cucumberQuery.getStepMatchArgumentsLists(
      uri,
      step.location.line
    )
    if (stepMatchArgumentsLists.length === 1) {
      // Step is defined
      const stepMatchArguments = stepMatchArgumentsLists[0].stepMatchArguments
      let offset = 0
      let plain: string
      stepMatchArguments.forEach((argument, index) => {
        plain = step.text.slice(offset, argument.group.start)
        if (plain.length > 0) {
          stepTextElements.push(
            <StepText key={`plain-${index}`}>{plain}</StepText>
          )
        }
        const arg = argument.group.value
        if (arg.length > 0) {
          stepTextElements.push(
            <StepParam key={`bold-${index}`} status={status}>
              {arg}
            </StepParam>
          )
        }
        offset += plain.length + arg.length
      })
      plain = step.text.slice(offset)
      if (plain.length > 0) {
        stepTextElements.push(<StepText key={`plain-rest`}>{plain}</StepText>)
      }
    } else if (stepMatchArgumentsLists.length === 2) {
      // Step is ambiguous
      stepTextElements.push(
        <StepText key={`plain-ambiguous`}>{step.text}</StepText>
      )
    } else {
      // Step is undefined
      stepTextElements.push(
        <StepText key={`plain-undefined`}>{step.text}</StepText>
      )
    }
  } else {
    // Step is from scenario with examples, and has <> placeholders.
    stepTextElements.push(
      <StepText key={`plain-placeholders`}>{step.text}</StepText>
    )
  }

  return (
    <li className="step" style={{ backgroundColor: statusColor(status).hex() }}>
      <H3>
        <Keyword>{step.keyword}</Keyword>
        {stepTextElements}
      </H3>
      <Indent>
        {step.dataTable && <DataTable dataTable={step.dataTable} />}
        {step.docString && <DocString docString={step.docString} />}
      </Indent>
      {resultsWithMessage.map((result, i) => (
        <ErrorMessage key={i} status={status}>
          {result.message}
        </ErrorMessage>
      ))}
    </li>
  )
}

export default Step
