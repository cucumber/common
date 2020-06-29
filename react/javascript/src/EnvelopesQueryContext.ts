import React from 'react'
import { messages } from '@cucumber/messages'

export class EnvelopesQuery {
  private envelopes: messages.IEnvelope[] = []

  public update(envelope: messages.IEnvelope) {
    this.envelopes.push(envelope)
  }

  public find(
    predicate: (envelope: messages.IEnvelope) => boolean
  ): messages.IEnvelope {
    return this.envelopes.find(predicate)
  }

  public filter(
    predicate: (envelope: messages.IEnvelope) => boolean
  ): messages.IEnvelope[] {
    return this.envelopes.filter(predicate)
  }
}

export default React.createContext(new EnvelopesQuery())
