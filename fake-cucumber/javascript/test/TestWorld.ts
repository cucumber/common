import IWorld from '../src/IWorld'
import { messages } from '@cucumber/messages'

export default class TestWorld implements IWorld {
  public testStepId: string
  public readonly attachments: messages.Attachment[] = []

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public attach(data: any, mediaType: string): void {
    if (typeof data !== 'string') {
      throw new Error('Can only attach strings')
    }
    const attachment = new messages.Attachment({
      body: data,
      mediaType: 'text/plain',
    })
    this.attachments.push(attachment)
  }

  public log(text: string): void {
    this.attach(text, 'text/x.cucumber.log+plain')
  }
}
