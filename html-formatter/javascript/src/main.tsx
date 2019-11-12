import { messages } from 'cucumber-messages'
import { GherkinDocumentList } from 'cucumber-react'
import React from 'react'
import ReactDOM from 'react-dom'
import CucumberQuery from 'cucumber-query'

declare global {
  interface Window {
    CUCUMBER_MESSAGES: any[];
  }
}

const envelopes = window.CUCUMBER_MESSAGES.map((message: any) => messages.Envelope.fromObject(message))

const gherkinDocuments = envelopes.filter(e => e.gherkinDocument).map(e => e.gherkinDocument)
const cucumberQuery = envelopes.reduce((q, e) => q.update(e), new CucumberQuery())

const app = <GherkinDocumentList
  gherkinDocuments={gherkinDocuments}
  cucumberQuery={cucumberQuery}
/>

ReactDOM.render(app, document.getElementById('content'))
