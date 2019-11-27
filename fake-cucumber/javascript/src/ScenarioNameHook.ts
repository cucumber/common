import SupportCodeExecutor from './SupportCodeExecutor'
import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'
import { HookType, IHook } from './IHook'

export default class ScenarioNameHook implements IHook {
  public readonly id = uuidv4()

  constructor(
    private readonly type: HookType,
    private readonly expression: RegExp,
    private readonly body: (...args: any) => any
  ) {}

  public match(
    pickle: messages.IPickle,
    type: HookType
  ): SupportCodeExecutor | null {
    if (this.type === type && this.expression.test(pickle.name)) {
      return new SupportCodeExecutor(this.id, this.body, [], null, null)
    }
    return undefined
  }

  public toMessage(): messages.IEnvelope {
    return new messages.Envelope({
      testCaseHookDefinitionConfig: new messages.TestCaseHookDefinitionConfig({
        id: this.id,
        location: new messages.SourceReference({
          location: new messages.Location({
            column: 3,
            line: 10,
          }),
          uri: 'some/javascript/hooks.js',
        }),
      }),
    })
  }
}
