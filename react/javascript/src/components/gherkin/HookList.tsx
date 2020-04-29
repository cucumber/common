import { messages } from '@cucumber/messages'
import React from 'react'
import HookStep from './HookStep'
import CucumberQueryContext from '../../CucumberQueryContext'

interface IProps {
  hookSteps: ReadonlyArray<messages.TestCase.ITestStep>
}

const HookList: React.FunctionComponent<IProps> = ({ hookSteps }) => {

  const cucumberQuery = React.useContext(CucumberQueryContext)

  const failedHookSteps = hookSteps.filter((hook) => {
    const hookResults = cucumberQuery.getTestStepResults(hook.id)
    const worstResult = cucumberQuery.getWorstTestStepResult(hookResults)
    return worstResult.status === messages.TestStepResult.Status.FAILED
  })

  return (
    <ol>
      {failedHookSteps.map((step, index) => (
        <HookStep key={index} step={step} />
      ))}
    </ol>
  )
}

export default HookList
