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
import ErrorMessage from './ErrorMessage'
import StatusBadge from './StatusBadge'

interface IProps {
  step: messages.GherkinDocument.Feature.IStep
  renderStepMatchArguments: boolean
  renderMessage: boolean
}

const Step: React.FunctionComponent<IProps> = ({
  step,
  renderStepMatchArguments,
  renderMessage,
}) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const testResultQuery = React.useContext(TestResultQueryContext)
  const stepMatchArgumentsQuery = React.useContext(
    StepMatchArgumentsQueryContext
  )
  const uri = React.useContext(UriContext)

  const pickleStepIds = gherkinQuery.getPickleStepIds(uri, step.location.line)
  const pickleStepResults = testResultQuery.getPickleStepResults(pickleStepIds)
  const testResult = testResultQuery.getWorstResult(pickleStepResults)

  const stepTextElements: JSX.Element[] = []

  if (renderStepMatchArguments) {
    const stepMatchArgumentsLists =
      pickleStepIds.length === 0
        ? // This can happen in rare cases for background steps in a document that only has step-less scenarios,
          // because background steps are not added to the pickle when the scenario has no steps. In this case
          // the bacground step will be rendered as undefined (even if there are matching step definitions). This
          // is not ideal, but it is rare enough that we don't care about it for now.
          []
        : stepMatchArgumentsQuery.getStepMatchArgumentsLists(pickleStepIds[0])
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
    <li className="step">
      <h3>
        <Keyword>{step.keyword}</Keyword>
        {stepTextElements}
      </h3>
      <StatusBadge status={testResult.status} />
      <div className="indent">
        {step.dataTable && <DataTable dataTable={step.dataTable} />}
        {step.docString && <DocString docString={step.docString} />}
      </div>
      {renderMessage && testResult.message && (
        <ErrorMessage status={testResult.status} message={testResult.message} />
      )}
    </li>
  )
}

export default Step
