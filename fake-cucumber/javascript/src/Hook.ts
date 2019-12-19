import IHook from './IHook'
import parseTagExpression from 'cucumber-tag-expressions'
import { messages } from 'cucumber-messages'
import SupportCodeExecutor from './SupportCodeExecutor'
import { AnyBody } from './types'

export default class Hook implements IHook {
  constructor(
    public readonly id: string,
    private readonly tagExpression: string | null,
    private readonly sourceReference: messages.ISourceReference,
    private readonly body: AnyBody
  ) {}

  public match(pickle: messages.IPickle): SupportCodeExecutor | null {
    const matches =
      this.tagExpression === null || this.matchesTagExpression(pickle)

    return matches
      ? new SupportCodeExecutor(this.id, this.body, [], null, null)
      : null
  }

  public toMessage(): messages.IEnvelope {
    return new messages.Envelope({
      hook: new messages.Hook({
        id: this.id,
        tagExpression: this.tagExpression,
        sourceReference: this.sourceReference,
      }),
    })
  }

  private matchesTagExpression(pickle: messages.IPickle): boolean {
    const expression = parseTagExpression(this.tagExpression)
    const tagNames = pickle.tags.map(tag => tag.name)
    return expression.evaluate(tagNames)
  }
}
