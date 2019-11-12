import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from 'cucumber-messages'
import all from '../testdata/all.json'
import StepList from '../src/components/gherkin/StepList'

const envelopes = all.map(o => messages.Envelope.fromObject(o))

storiesOf('Features', module)
  .add('Full document', () => {
    const { gherkinDocuments, resultsLookup, stepMatchLookup } = makeGherkinDocumentsAndResultsLookup(envelopes)
    return <App
      gherkinDocuments={gherkinDocuments}
      resultsLookup={resultsLookup}
      stepMatchLookup={stepMatchLookup}
    />
  })
  .add('Steps', () => {
    const steps = [
      new messages.GherkinDocument.Feature.Step({
        keyword: 'Given ',
        text: 'flight LHR-CDG on the 1st Nov is full',
        location: new messages.Location({
          column: 4,
          line: 10,
        }),
      }),
    ]
    const stepMatchLookupByLine: StepMatchLookupByLine = () => {
      return [
        new messages.TestStepMatched({
          stepMatchArguments: [
            new messages.StepMatchArgument({
              group: new messages.StepMatchArgument.Group({
                start: 7,
                value: 'LHR-CDG',
                children: [],
              }),
            }),
            new messages.StepMatchArgument({
              group: new messages.StepMatchArgument.Group({
                start: 22,
                value: '1st Nov',
                children: [],
              }),
            }),
          ]
        })
      ]
    }

    return <StepMatchLookupByLineContext.Provider value={stepMatchLookupByLine}>
      <StepList steps={steps}/>
    </StepMatchLookupByLineContext.Provider>
  })
