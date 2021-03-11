import React from 'react'
import * as messages from '@cucumber/messages'

export class EnvelopesQuery {
  private envelopes: messages.Envelope[] = []

  public update(envelope: messages.Envelope) {
    this.envelopes.push(envelope)
  }

  public find(predicate: (envelope: messages.Envelope) => boolean): messages.Envelope {
    return this.envelopes.find(predicate)
  }

  public filter(predicate: (envelope: messages.Envelope) => boolean): messages.Envelope[] {
    return this.envelopes.filter(predicate)
  }
}

export default React.createContext(new EnvelopesQuery())
