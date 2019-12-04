import IWorld from '../src/IWorld'
import { messages } from 'cucumber-messages'

export default class TestWorld implements IWorld {
  public readonly attachments: messages.Attachment[] = []

  public attach(data: string, contentType: string): void {
    const attachment = new messages.Attachment({
      data,
      media: new messages.Media({
        contentType: 'text/plain',
        encoding: messages.Media.Encoding.UTF8,
      }),
    })
    this.attachments.push(attachment)
  }
}
