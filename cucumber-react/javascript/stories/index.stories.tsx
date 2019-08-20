import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from 'cucumber-messages'
import all from '../testdata/all.json'
import App from '../src/components/app/App'
import makeGherkinDocumentsAndResultsLookup from '../src/components/app/makeGherkinDocumentsAndResultsLookup'

storiesOf('Features', module)
  .add('All', () => {
    const { gherkinDocuments, resultsLookup } = makeGherkinDocumentsAndResultsLookup(all as messages.IEnvelope[])
    return <App gherkinDocuments={gherkinDocuments} resultsLookup={resultsLookup}/>
  })
