import { messages } from 'cucumber-messages'
import React from 'react'
import Step from './Step'
import { Ol } from './html'

interface IProps {
  steps: messages.GherkinDocument.Feature.IStep[]
  renderStepMatchArguments: boolean
}

const StepList: React.FunctionComponent<IProps> = ({
  steps,
  renderStepMatchArguments,
}) => {
  return (
    <Ol>
      {steps.map((step, index) => (
        <Step
          key={index}
          step={step}
          renderStepMatchArguments={renderStepMatchArguments}
        />
      ))}
    </Ol>
  )
}

export default StepList
