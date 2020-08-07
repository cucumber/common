import React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from '@cucumber/messages'
import CucumberQueryContext from '../../CucumberQueryContext'
import GherkinQueryContext from '../../GherkinQueryContext'
import ErrorMessage from './ErrorMessage'
import StepContainer from './StepContainer'
import Attachment from './Attachment'
import HighLight from '../app/HighLight'

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

  const pickleStepIds = gherkinQuery.getPickleStepIds(step.id)
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
        : cucumberQuery.getStepMatchArgumentsLists(pickleStepIds[0]) || []
    if (stepMatchArgumentsLists.length === 1) {
      // Step is defined
      const stepMatchArguments = stepMatchArgumentsLists[0].stepMatchArguments
      let offset = 0
      let plain: string
      stepMatchArguments.forEach((argument, index) => {
        plain = step.text.slice(offset, argument.group.start)
        if (plain.length > 0) {
          stepTextElements.push(
            <span className="cucumber-step__text" key={`plain-${index}`}>
              <HighLight text={plain} />
            </span>
          )
        }
        const arg = argument.group.value
        if (arg.length > 0) {
          stepTextElements.push(
            <a
              className="cucumber-step__param"
              key={`bold-${index}`}
              title={argument.parameterTypeName}
            >
              <HighLight text={arg} />
            </a>
          )
        }
        offset += plain.length + arg.length
      })
      plain = step.text.slice(offset)
      if (plain.length > 0) {
        stepTextElements.push(
          <span className="cucumber-step__text" key={`plain-rest`}>
            <HighLight text={plain} />
          </span>
        )
      }
    } else if (stepMatchArgumentsLists.length >= 2) {
      // Step is ambiguous
      stepTextElements.push(
        <span className="cucumber-step__text" key={`plain-ambiguous`}>
          <HighLight text={step.text} />
        </span>
      )
    } else {
      // Step is undefined
      stepTextElements.push(
        <span className="cucumber-step__text" key={`plain-undefined`}>
          <HighLight text={step.text} />
        </span>
      )
    }
  } else {
    // Step is from scenario with examples, and has <> placeholders.
    stepTextElements.push(
      <span className="cucumber-step__text" key={`plain-placeholders`}>
        <HighLight text={step.text} />
      </span>
    )
  }

  return (
    <StepContainer status={testStepResult.status}>
      <h3 className="cucumber-step__title">
        <Keyword className="cucumber-step__keyword">{step.keyword}</Keyword>
        {stepTextElements}
      </h3>
      {step.dataTable && <DataTable dataTable={step.dataTable} />}
      {step.docString && <DocString docString={step.docString} />}
      {renderMessage && testStepResult.message && (
        <ErrorMessage message={testStepResult.message} />
      )}
      <div className="cucumber-attachments">
        {attachments.map((attachment, i) => (
          <Attachment key={i} attachment={attachment} />
        ))}
      </div>
    </StepContainer>
  )
}

export default Step
