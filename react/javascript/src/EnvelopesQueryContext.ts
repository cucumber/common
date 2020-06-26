import React from 'react'
import { messages } from '@cucumber/messages'

export class EnvelopesQuery {
  private envelopes: messages.IEnvelope[] = []

  public update(envelope: messages.IEnvelope) {
    this.envelopes.push(envelope)
  }

  public find(
    callback: (envelope: messages.IEnvelope) => boolean
  ): messages.IEnvelope {
    return this.envelopes.find(callback)
  }

  public filter(
    callback: (envelope: messages.IEnvelope) => boolean
  ): messages.IEnvelope[] {
    return this.envelopes.filter(callback)
  }
}

export default React.createContext(new EnvelopesQuery())
