import { messages } from 'cucumber-messages'
import { Expression } from 'cucumber-expressions'
import uuidv4 from 'uuid/v4'

import ISupportCodeExecutor from './ISupportCodeExecutor'

export default class StepDefinition {
  public readonly id = uuidv4()

  constructor(
    private readonly expression: Expression,
    private readonly executor: ISupportCodeExecutor
  ) {}

  public match(
    step: messages.Pickle.IPickleStep
  ): messages.IStepMatchArgument[] {
    return this.expression.match(step.text)
  }

  public execute(args: string[]): any {
    return this.executor.execute(...args)
  }
}