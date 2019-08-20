import all from '../../testdata/all.json'
import { messages } from 'cucumber-messages'
import App from '../components/app/App'
import React from 'react'
import makeGherkinDocumentsAndResultsLookup from '../components/app/makeGherkinDocumentsAndResultsLookup'
import ReactDOM from 'react-dom'

const { gherkinDocuments, resultsLookup } = makeGherkinDocumentsAndResultsLookup(all as messages.IEnvelope[])

const app = <App gherkinDocuments={gherkinDocuments} resultsLookup={resultsLookup}/>
ReactDOM.render(app, document.getElementById('content'));
