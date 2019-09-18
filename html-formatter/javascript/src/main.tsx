import { messages } from 'cucumber-messages'
import { App, makeGherkinDocumentsAndResultsLookup } from 'cucumber-react'
import React from 'react'
import ReactDOM from 'react-dom'

declare global {
  interface Window {
    CUCUMBER_MESSAGES: any[];
  }
}

const envelopes = window.CUCUMBER_MESSAGES.map((message: any) => messages.Envelope.fromObject(message))

const { gherkinDocuments, resultsLookup, stepMatchLookup } = makeGherkinDocumentsAndResultsLookup(envelopes)

const app = <App gherkinDocuments={gherkinDocuments} resultsLookup={resultsLookup} stepMatchLookup={stepMatchLookup}/>
ReactDOM.render(app, document.getElementById('content'))
