import React from 'react'
import * as messages from '@cucumber/messages'
import CucumberQueryContext from '../../CucumberQueryContext'
import ErrorMessage from './ErrorMessage'
import StepItem from './StepItem'
import Attachment from './Attachment'
import { getWorstTestStepResult } from '@cucumber/messages'
import Title from './Title'

interface IProps {
  step: messages.TestStep
}

const HookStep: React.FunctionComponent<IProps> = ({ step }) => {
  const cucumberQuery = React.useContext(CucumberQueryContext)

  const stepResult = getWorstTestStepResult(cucumberQuery.getTestStepResults(step.id))

  const hook = cucumberQuery.getHook(step.hookId)
  const attachments = cucumberQuery.getTestStepsAttachments([step.id])

  if (stepResult.status === 'FAILED') {
    let location = 'Unknown location'
    if (hook && hook.sourceReference.location) {
      location = `${hook.sourceReference.uri}:${hook.sourceReference.location.line}`
    } else if (hook && hook.sourceReference.javaMethod) {
      location = `${hook.sourceReference.javaMethod.className}.${hook.sourceReference.javaMethod.methodName}`
    }

    return (
      <StepItem status={stepResult.status}>
        <Title header="h3" id={step.id}>
          Hook failed: {location}
        </Title>
        {stepResult.message && <ErrorMessage message={stepResult.message} />}
        {attachments.map((attachment, i) => (
          <Attachment key={i} attachment={attachment} />
        ))}
      </StepItem>
    )
  }

  if (attachments) {
    return (
      <StepItem>
        {attachments.map((attachment, i) => (
          <Attachment key={i} attachment={attachment} />
        ))}
      </StepItem>
    )
  }
}

export default HookStep
