import React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from 'cucumber-messages'
import statusColor from './statusColor'
import CucumberQueryContext from '../../CucumberQueryContext'
import UriContext from '../../UriContext'

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
                backgroundColor: statusColor(status)
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
    <li className="step" style={{ backgroundColor: statusColor(status).hex() }}>
      <h3>
        <Keyword>{step.keyword}</Keyword>
        {stepTextElements}
      </h3>
      <div className="indent">
        {step.dataTable && <DataTable dataTable={step.dataTable} />}
        {step.docString && <DocString docString={step.docString} />}
      </div>
      {resultsWithMessage.map((result, i) => (
        <pre
          className="error-message"
          key={i}
          style={{
            backgroundColor: statusColor(status)
              .darken(0.1)
              .hex(),
          }}
        >
          {result.message}
        </pre>
      ))}
    </li>
  )
}

export default Step
