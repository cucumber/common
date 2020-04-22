import { messages } from '@cucumber/messages'
import { EnvelopeListener } from './types'
import IWorld from './IWorld'

export default interface ITestStep {
  alwaysExecute: boolean
  sourceId: string
  id: string

  toMessage(): messages.TestCase.ITestStep

  execute(
    world: IWorld,
    testCaseStartedId: string,
    listener: EnvelopeListener
  ): Promise<messages.TestStepFinished.ITestStepResult>

  skip(
    listener: EnvelopeListener,
    testCaseStartedId: string
  ): messages.TestStepFinished.ITestStepResult
}
