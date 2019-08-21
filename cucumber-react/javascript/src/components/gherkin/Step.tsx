import * as React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from 'cucumber-messages'
import GherkinDocumentContext from '../../GherkinDocumentContext'
import UriContext from '../../UriContext'
import styled from 'styled-components'
import Status = messages.TestResult.Status
import Color from 'color'

const StepLi = styled.li`
  background-color: ${(props: IStepLiProps) => {
    return {
      // Keep the same order as in messages.proto - for readability's sake
      [Status.PASSED]: Color('lime')
        .lighten(0.9)
        .hex(),
      [Status.SKIPPED]: Color('cyan')
        .lighten(0.9)
        .hex(),
      [Status.PENDING]: Color('yellow')
        .lighten(0.9)
        .hex(),
      [Status.UNDEFINED]: Color('orange')
        .lighten(0.9)
        .hex(),
      [Status.AMBIGUOUS]: Color('rebeccapurple')
        .lighten(0.9)
        .hex(),
      [Status.FAILED]: Color('red')
        .lighten(0.9)
        .hex(),
      [Status.UNKNOWN]: Color('gray')
        .lighten(0.9)
        .hex(),
    }[props.status]
  }};
`

interface IStepLiProps {
  status: Status
}

interface IProps {
  step: messages.GherkinDocument.Feature.IStep
}

const Step: React.FunctionComponent<IProps> = ({ step }) => {
  const uri = React.useContext(UriContext)
  const resultsLookup = React.useContext(GherkinDocumentContext)

  const testResults = resultsLookup(uri, step.location.line)
  const status = testResults[0].status
  return (
    <StepLi status={status}>
      <Keyword>{step.keyword}</Keyword>
      <span>{step.text}</span>
      {step.dataTable && <DataTable dataTable={step.dataTable} />}
      {step.docString && <DocString docString={step.docString} />}
    </StepLi>
  )
}

export default Step
