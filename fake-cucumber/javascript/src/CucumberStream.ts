import { Transform, TransformCallback } from 'stream'
import { IdGenerator, messages } from 'cucumber-messages'
import Cucumber from './Cucumber'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'

export default class CucumberStream extends Transform {
  private readonly gherkinMessages: messages.IEnvelope[] = []

  constructor(
    private readonly stepDefinitions: IStepDefinition[],
    private readonly beforeHooks: IHook[],
    private readonly afterHooks: IHook[],
    private readonly newId: IdGenerator.NewId
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
      this.beforeHooks,
      this.afterHooks,
      this.newId
    )
    cucumber
      .execute(message => this.push(message))
      .then(() => callback())
      .catch(err => callback(err))
  }
}
