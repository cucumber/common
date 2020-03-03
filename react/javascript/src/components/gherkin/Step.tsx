import React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from '@cucumber/messages'
import CucumberQueryContext from '../../CucumberQueryContext'
import UriContext from '../../UriContext'
import GherkinQueryContext from '../../GherkinQueryContext'
import ErrorMessage from './ErrorMessage'
import StepContainer from './StepContainer'
import Attachment from './Attachment'

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
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const uri = React.useContext(UriContext)

  const pickleStepIds = gherkinQuery.getPickleStepIds(uri, step.location.line)
  const pickleStepTestStepResults = cucumberQuery.getPickleStepTestStepResults(
    pickleStepIds
  )
  const testStepResult = cucumberQuery.getWorstTestStepResult(
    pickleStepTestStepResults
  )
  const attachments = cucumberQuery.getPickleStepAttachments(pickleStepIds)

  const stepTextElements: JSX.Element[] = []

  if (renderStepMatchArguments) {
    const stepMatchArgumentsLists =
      pickleStepIds.length === 0
        ? // This can happen in rare cases for background steps in a document that only has step-less scenarios,
          // because background steps are not added to the pickle when the scenario has no steps. In this case
          // the background step will be rendered as undefined (even if there are matching step definitions). This
          // is not ideal, but it is rare enough that we don't care about it for now.
          []
        : cucumberQuery.getStepMatchArgumentsLists(pickleStepIds[0])
    if (stepMatchArgumentsLists && stepMatchArgumentsLists.length === 1) {
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
            <a
              className="step-param"
              key={`bold-${index}`}
              href="#"
              title={argument.parameterTypeName}
            >
              {arg}
            </a>
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
      <StepContainer status={testStepResult.status}>
        <h3>
          <Keyword>{step.keyword}</Keyword>
          {stepTextElements}
        </h3>
        {step.dataTable && <DataTable dataTable={step.dataTable} />}
        {step.docString && <DocString docString={step.docString} />}
        {renderMessage && testStepResult.message && (
          <ErrorMessage message={testStepResult.message} />
        )}
        {attachments.map((attachment, i) => (
          <Attachment key={i} attachment={attachment} />
        ))}
      </StepContainer>
    </li>
  )
}

export default Step
