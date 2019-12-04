import { messages } from 'cucumber-messages'

export default interface IStepMatch {
  stepDefinitionId: string;
  arguments: messages.IStepMatchArgument[];
}