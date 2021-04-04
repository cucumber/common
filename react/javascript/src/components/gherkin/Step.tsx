import React from 'react'
import DataTable from './DataTable'
import DocString from './DocString'
import { messages } from '@cucumber/messages'
import CucumberQueryContext from '../../CucumberQueryContext'
import GherkinQueryContext from '../../GherkinQueryContext'
import ErrorMessage from './ErrorMessage'
import Attachment from './Attachment'
import StepLine from './StepLine'

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
  const pickleStepTestStepResults = cucumberQuery.getPickleStepTestStepResults(pickleStepIds)
  const testStepResult = cucumberQuery.getWorstTestStepResult(pickleStepTestStepResults)
  const attachments = cucumberQuery.getPickleStepAttachments(pickleStepIds)

  return (
    <>
      <div className="cucumber-step__title">
        <StepLine step={step} renderStepMatchArguments={renderStepMatchArguments} />
      </div>
      {step.dataTable && <DataTable dataTable={step.dataTable} />}
      {step.docString && <DocString docString={step.docString} />}
      {renderMessage && testStepResult.message && <ErrorMessage message={testStepResult.message} />}
      <div className="cucumber-attachments">
        {attachments.map((attachment, i) => (
          <Attachment key={i} attachment={attachment} />
        ))}
      </div>
    </>
  )
}

export default Step
