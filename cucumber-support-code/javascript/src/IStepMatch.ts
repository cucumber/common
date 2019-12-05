import { messages } from 'cucumber-messages'

export default interface IStepMatch {
  stepDefinitionId: string
  args: messages.IStepMatchArgument[]
}
