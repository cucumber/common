import React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from '@cucumber/messages'
import statusColor from './statusColor'
import TestResultQueryContext from '../../TestResultsQueryContext'
import UriContext from '../../UriContext'
import GherkinQueryContext from '../../GherkinQueryContext'
import StepMatchArgumentsQueryContext from '../../StepMatchArgumentsQueryContext'

interface IProps {
  step: messages.GherkinDocument.Feature.IStep
  renderStepMatchArguments: boolean
}

const Step: React.FunctionComponent<IProps> = ({
  step,
  renderStepMatchArguments,
}) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const testResultQuery = React.useContext(TestResultQueryContext)
  const stepMatchArgumentsQuery = React.useContext(
    StepMatchArgumentsQueryContext
  )
  const uri = React.useContext(UriContext)

  const pickleStepIds = gherkinQuery.getPickleStepIds(uri, step.location.line)

  const testResult = testResultQuery.getWorstResult(
    testResultQuery.getPickleStepResults(pickleStepIds[0])
  )

  const stepTextElements: JSX.Element[] = []

  if (renderStepMatchArguments) {
    const stepMatchArgumentsLists = stepMatchArgumentsQuery.getStepMatchArgumentsLists(
      pickleStepIds[0]
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
            <span className="step-text" key={`plain-${index}`}>
              {plain}
            </span>
          )
        }
        const arg = argument.group.value
        if (arg.length > 0) {
          stepTextElements.push(
            <span
              className="step-param"
              key={`bold-${index}`}
              style={{
                backgroundColor: statusColor(testResult.status)
                  .darken(0.1)
                  .hex(),
              }}
            >
              {arg}
            </span>
          )
        }
        offset += plain.length + arg.length
      })
      plain = step.text.slice(offset)
      if (plain.length > 0) {
        stepTextElements.push(
          <span className="step-text" key={`plain-rest`}>
            {plain}
          </span>
        )
      }
    } else if (stepMatchArgumentsLists.length === 2) {
      // Step is ambiguous
      stepTextElements.push(
        <span className="step-text" key={`plain-ambiguous`}>
          {step.text}
        </span>
      )
    } else {
      // Step is undefined
      stepTextElements.push(
        <span className="step-text" key={`plain-undefined`}>
          {step.text}
        </span>
      )
    }
  } else {
    // Step is from scenario with examples, and has <> placeholders.
    stepTextElements.push(
      <span className="step-text" key={`plain-placeholders`}>
        {step.text}
      </span>
    )
  }

  return (
    <li
      className="step"
      style={{ backgroundColor: statusColor(testResult.status).hex() }}
    >
      <h3>
        <Keyword>{step.keyword}</Keyword>
        {stepTextElements}
      </h3>
      <div className="indent">
        {step.dataTable && <DataTable dataTable={step.dataTable} />}
        {step.docString && <DocString docString={step.docString} />}
      </div>
      {testResult.message && (
        <pre
          className="error-message"
          style={{
            backgroundColor: statusColor(testResult.status)
              .darken(0.1)
              .hex(),
          }}
        >
          {testResult.message}
        </pre>
      )}
    </li>
  )
}

export default Step
