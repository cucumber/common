import { messages } from '@cucumber/messages'
import React from 'react'
import HookStep from './HookStep'

interface IProps {
  hookSteps: ReadonlyArray<messages.TestCase.ITestStep>
}

const HookList: React.FunctionComponent<IProps> = ({ hookSteps }) => {
  return (
    <>
      {hookSteps.map((step, index) => (
        <HookStep key={index} step={step} />
      ))}
    </>
  )
}

export default HookList
