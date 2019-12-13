import { Readable } from 'stream'

export default interface IWorld {
  testStepId: string

  attach(data: string | Buffer | Readable, mediaType: string): void
}
