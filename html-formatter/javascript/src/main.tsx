import { messages } from '@cucumber/messages'
import { GherkinDocumentList, Wrapper } from '@cucumber/react'
import React from 'react'
import ReactDOM from 'react-dom'

declare global {
  interface Window {
    CUCUMBER_MESSAGES: messages.IEnvelope[]
  }
}

const envelopes = window.CUCUMBER_MESSAGES.map((message: any) =>
  messages.Envelope.fromObject(message)
)

const app = (
  <Wrapper envelopes={envelopes}>
    <GherkinDocumentList />
  </Wrapper>
)

ReactDOM.render(app, document.getElementById('content'))
