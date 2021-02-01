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
    <ol className="cucumber-steps">
      {steps.map((step, index) => (
        <li key={index} className="cucumber-step">
          <Step
            step={step}
            renderStepMatchArguments={renderStepMatchArguments}
            renderMessage={renderMessage}
          />
        </li>
      ))}
    </ol>
  )
}

export default StepList
