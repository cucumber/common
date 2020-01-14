import { BinaryToMessageStream, messages, MessageToBinaryStream } from '../src'
import verifyStreamContract from './verifyStreamContract'

describe('BinaryStream', () => {
  const makeToMessageStream = () =>
    new BinaryToMessageStream(
      messages.Envelope.decodeDelimited.bind(messages.Envelope)
    )
  const makeFromMessageStream = () => new MessageToBinaryStream()
  verifyStreamContract(makeFromMessageStream, makeToMessageStream)
})
