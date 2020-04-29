import React from 'react'
import { messages } from '@cucumber/messages'
import CucumberQueryContext from '../../CucumberQueryContext'
import ErrorMessage from './ErrorMessage'
import StepContainer from './StepContainer'
import Attachment from './Attachment'

interface IProps {
  step: messages.TestCase.ITestStep
}

const HookStep: React.FunctionComponent<IProps> = ({ step }) => {
  const cucumberQuery = React.useContext(CucumberQueryContext)

  const stepResult = cucumberQuery.getWorstTestStepResult(
    cucumberQuery.getTestStepResults(step.id)
  )

  const hook = cucumberQuery.getHook(step.hookId)

  const attachments: messages.IAttachment[] = []

  return (
    <li className="step">
      <StepContainer status={stepResult.status}>
        <h3>Hook failed: {hook.sourceReference.uri}:{hook.sourceReference.location.line}</h3>
        {stepResult.message && <ErrorMessage message={stepResult.message} />}
        {attachments.map((attachment, i) => (
          <Attachment key={i} attachment={attachment} />
        ))}
      </StepContainer>
    </li>
  )
}

export default HookStep
