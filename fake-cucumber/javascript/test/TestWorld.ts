import IWorld from '../src/IWorld'
import { messages } from '@cucumber/messages'

export default class TestWorld implements IWorld {
  public testStepId: string
  public readonly attachments: messages.Attachment[] = []

  public attach(data: any, mediaType: string): void {
    if (typeof data !== 'string') {
      throw new Error('Can only attach strings')
    }
    const attachment = new messages.Attachment({
      text: data,
      mediaType: 'text/plain',
    })
    this.attachments.push(attachment)
  }
}
