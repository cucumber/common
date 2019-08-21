import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from 'cucumber-messages'
import all from '../testdata/all.json'
import App from '../src/components/app/App'
import makeGherkinDocumentsAndResultsLookup from '../src/makeGherkinDocumentsAndResultsLookup'

const envelopes = all.map(o => messages.Envelope.fromObject(o))

storiesOf('Features', module)
  .add('All', () => {
    const { gherkinDocuments, resultsLookup } = makeGherkinDocumentsAndResultsLookup(envelopes)
    return <App gherkinDocuments={gherkinDocuments} resultsLookup={resultsLookup}/>
  })
