import { Transform, TransformCallback } from 'stream'
import { messages } from 'cucumber-messages'
import Cucumber from './Cucumber'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'

export default class CucumberStream extends Transform {
  private readonly gherkinMessages: messages.IEnvelope[] = []

  constructor(
    private readonly stepDefinitions: IStepDefinition[],
    private readonly hooks: IHook[]
  ) {
    super({ objectMode: true })
  }

  public _transform(
    message: messages.IEnvelope,
    _: string,
    callback: TransformCallback
  ): void {
    this.gherkinMessages.push(message)
    callback()
  }

  public _flush(callback: TransformCallback): void {
    const cucumber = new Cucumber(
      this.gherkinMessages,
      this.stepDefinitions,
      this.hooks
    )
    cucumber
      .execute(message => this.push(message))
      .then(() => callback())
      .catch(err => callback(err))
  }
}
