import { Transform, TransformCallback } from 'stream'
import { messages } from 'cucumber-messages'
import Cucumber from './Cucumber'
import { ICucumberSupportCode } from './support-code'

export default class CucumberStream extends Transform {
  private readonly gherkinMessages: messages.IEnvelope[] = []

  constructor(
    private readonly supportCode: ICucumberSupportCode,
    private readonly supportCodeRegister: (supportCode: ICucumberSupportCode) => messages.IEnvelope[]
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
      this.supportCode,
      this.supportCodeRegister
    )
    cucumber.execute(message => this.push(message))
    callback()
  }
}
