import { messages } from 'cucumber-messages'
import React from 'react'
import Step from './Step'
import { Ol } from './html'

interface IProps {
  steps: messages.GherkinDocument.Feature.IStep[]
}

const StepList: React.FunctionComponent<IProps> = ({ steps }) => {
  return (
    <Ol>
      {steps.map((step, index) => (
        <Step key={index} step={step}/>
      ))}
    </Ol>
  )
}

export default StepList
