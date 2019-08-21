import { messages } from 'cucumber-messages'
import * as React from 'react'
import Step from './Step'
import styled from 'styled-components'

const StepsOl = styled.ol`
  list-style-type: none;
  padding-left: 0;
`

interface IProps {
  steps: messages.GherkinDocument.Feature.IStep[]
}

const StepList: React.FunctionComponent<IProps> = ({ steps }) => {
  return (
    <StepsOl>
      {steps.map((step, index) => (
        <Step key={index} step={step}/>
      ))}
    </StepsOl>
  )
}

export default StepList
