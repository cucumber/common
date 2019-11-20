import { Transform, TransformCallback } from 'stream'
import { messages } from 'cucumber-messages'
import StepDefinition from './StepDefinition'
import Cucumber from './Cucumber'

export default class CucumberStream extends Transform {
  private readonly gherkinMessages: messages.IEnvelope[] = []

  constructor(private readonly stepDefinitions: StepDefinition[]) {
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
