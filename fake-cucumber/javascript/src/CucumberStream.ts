import { Transform, TransformCallback } from 'stream'
import { GherkinQuery } from '@cucumber/gherkin'
import { IdGenerator, messages } from '@cucumber/messages'
import Cucumber from './Cucumber'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'
import { ParameterType } from '@cucumber/cucumber-expressions'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'

export default class CucumberStream extends Transform {
  private readonly gherkinMessages: messages.IEnvelope[] = []
  private readonly gherkinQuery = new GherkinQuery()

  constructor(
    private readonly parameterTypes: Array<ParameterType<any>>,
    private readonly stepDefinitions: IStepDefinition[],
    private readonly beforeHooks: IHook[],
    private readonly afterHooks: IHook[],
    private readonly newId: IdGenerator.NewId,
    private readonly clock: IClock,
    private readonly makeErrorMessage: MakeErrorMessage
  ) {
    super({ objectMode: true })
  }

  public _transform(
    message: messages.IEnvelope,
    _: string,
    callback: TransformCallback
  ): void {
    this.gherkinMessages.push(message)
    try {
      this.gherkinQuery.update(message)
      callback()
    } catch (err) {
      callback(err)
    }
  }

  public _flush(callback: TransformCallback): void {
    const cucumber = new Cucumber(
      this.gherkinMessages,
      this.parameterTypes,
      this.stepDefinitions,
      this.beforeHooks,
      this.afterHooks,
      this.gherkinQuery,
      this.newId,
      this.clock,
      this.makeErrorMessage
    )
    cucumber
      .execute(message => this.push(message))
      .then(() => callback())
      .catch(err => callback(err))
  }
}
