import React from 'react'
import * as messages from '@cucumber/messages'
import CucumberQueryContext from '../../CucumberQueryContext'
import ErrorMessage from './ErrorMessage'
import StepContainer from './StepContainer'
import Attachment from './Attachment'

interface IProps {
  step: messages.TestStep
}

const HookStep: React.FunctionComponent<IProps> = ({ step }) => {
  const cucumberQuery = React.useContext(CucumberQueryContext)

  const stepResult = cucumberQuery.getWorstTestStepResult(cucumberQuery.getTestStepResults(step.id))

  const hook = cucumberQuery.getHook(step.hook_id)
  const attachments = cucumberQuery.getTestStepsAttachments([step.id])

  if (stepResult.status === 'FAILED') {
    const location = hook.source_reference.location
      ? hook.source_reference.uri + ':' + hook.source_reference.location.line
      : hook.source_reference.java_method
      ? hook.source_reference.java_method.class_name +
        '.' +
        hook.source_reference.java_method.method_name
      : 'Unknown location'
    return (
      <StepContainer status={stepResult.status}>
        <h3>Hook failed: {location}</h3>
        {stepResult.message && <ErrorMessage message={stepResult.message} />}
        {attachments.map((attachment, i) => (
          <Attachment key={i} attachment={attachment} />
        ))}
      </StepContainer>
    )
  }

  if (attachments) {
    return (
      <li className="cucumber-step">
        {attachments.map((attachment, i) => (
          <Attachment key={i} attachment={attachment} />
        ))}
      </li>
    )
  }
}

export default HookStep
