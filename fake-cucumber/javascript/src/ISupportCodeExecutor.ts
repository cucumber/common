import { messages } from '@cucumber/messages'
import IWorld from './IWorld'

export default interface ISupportCodeExecutor {
  readonly stepDefinitionId: string

  execute(thisObj: IWorld): any

  argsToMessages(): messages.TestCase.TestStep.StepMatchArgumentsList.IStepMatchArgument[]
}
