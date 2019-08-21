import { messages } from 'cucumber-messages'
import App from '../components/app/App'
import React from 'react'
import makeGherkinDocumentsAndResultsLookup from '../makeGherkinDocumentsAndResultsLookup'
import ReactDOM from 'react-dom'

declare global {
  interface Window { CUCUMBER_MESSAGES: string; }
}

const envelopes = JSON.parse(window.CUCUMBER_MESSAGES).map((message: any) => messages.Envelope.fromObject(message))

const { gherkinDocuments, resultsLookup } = makeGherkinDocumentsAndResultsLookup(envelopes)

const app = <App gherkinDocuments={gherkinDocuments} resultsLookup={resultsLookup}/>
ReactDOM.render(app, document.getElementById('content'));
