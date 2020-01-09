import { messages } from '@cucumber/messages'
import React from 'react'
import Step from './Step'

interface IProps {
  steps: messages.GherkinDocument.Feature.IStep[]
  renderStepMatchArguments: boolean
}

const StepList: React.FunctionComponent<IProps> = ({
  steps,
  renderStepMatchArguments,
}) => {
  return (
    <ol>
      {steps.map((step, index) => (
        <Step
          key={index}
          step={step}
          renderStepMatchArguments={renderStepMatchArguments}
        />
      ))}
    </ol>
  )
}

export default StepList
