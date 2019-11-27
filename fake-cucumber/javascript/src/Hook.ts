import { HookType, IHook } from './IHook'
import uuidv4 from 'uuid/v4'
import parseTagExpression from 'cucumber-tag-expressions'
import { messages } from 'cucumber-messages'
import SupportCodeExecutor from './SupportCodeExecutor'
import { AnyBody } from './types'

export default class Hook implements IHook {
  public readonly id = uuidv4()

  constructor(
    private readonly hookType: HookType,
    private readonly tagExpression: string | null,
    private readonly body: AnyBody
  ) {}

  public match(
    pickle: messages.IPickle,
    hookType: HookType
  ): SupportCodeExecutor | null {
    const matches =
      this.hookType === hookType &&
      (this.tagExpression === null || this.matchesTagExpression(pickle))

    return matches
      ? new SupportCodeExecutor(this.id, this.body, [], null, null)
      : null
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

  private matchesTagExpression(pickle: messages.IPickle): boolean {
    return parseTagExpression(this.tagExpression).evaluate(
      pickle.tags.map(tag => tag.name)
    )
  }
}
