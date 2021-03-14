import * as messages from '@cucumber/messages'
import React from 'react'
import Step from './Step'

interface IProps {
  steps: readonly messages.Step[]
  renderStepMatchArguments: boolean
  renderMessage: boolean
}

const StepList: React.FunctionComponent<IProps> = ({
  steps,
  renderStepMatchArguments,
  renderMessage,
}) => {
  return (
    <>
      {steps.map((step, index) => (
        <Step
          key={index}
          step={step}
          renderStepMatchArguments={renderStepMatchArguments}
          renderMessage={renderMessage}
        />
      ))}
    </>
  )
}

export default StepList
