import { messages } from '@cucumber/messages'
import React from 'react'
import Step from './Step'

interface IProps {
  steps: messages.GherkinDocument.Feature.IStep[]
  renderStepMatchArguments: boolean
  renderMessage: boolean
}

const StepList: React.FunctionComponent<IProps> = ({
  steps,
  renderStepMatchArguments,
  renderMessage,
}) => {
  return (
    <ol>
      {steps.map((step, index) => (
        <Step
          key={index}
          step={step}
          renderStepMatchArguments={renderStepMatchArguments}
          renderMessage={renderMessage}
        />
      ))}
    </ol>
  )
}

export default StepList
