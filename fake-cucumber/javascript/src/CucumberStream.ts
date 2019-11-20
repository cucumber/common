import { Transform, TransformCallback } from 'stream'
import { messages } from 'cucumber-messages'
import Cucumber from './Cucumber'
import IStepDefinition from './IStepDefinition'

export default class CucumberStream extends Transform {
  private readonly gherkinMessages: messages.IEnvelope[] = []

  constructor(private readonly stepDefinitions: IStepDefinition[]) {
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
    const cucumber = new Cucumber(this.gherkinMessages, this.stepDefinitions)
    cucumber.execute(message => this.push(message))
    callback()
  }
}
