import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from 'cucumber-messages'
import all from '../testdata/all.json'
import StepList from '../src/components/gherkin/StepList'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import CucumberQuery from 'cucumber-query'
import CucumberQueryContext from '../src/CucumberQueryContext';

const envelopes = all.map(o => messages.Envelope.fromObject(o))

storiesOf('Features', module)
  .add('Document list', () => {
    const gherkinDocuments = envelopes.filter(e => e.gherkinDocument).map(e => e.gherkinDocument)
    const cucumberQuery = envelopes.reduce((q, e) => q.update(e), new CucumberQuery())
    return <GherkinDocumentList
      gherkinDocuments={gherkinDocuments}
      cucumberQuery={cucumberQuery}
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

    class StubCucumberQuery extends CucumberQuery {
      getStepMatchArguments(uri: string, lineNumber: number): messages.IStepMatchArgument[] {
        return [
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
      }
    }

  return <CucumberQueryContext.Provider value={new StubCucumberQuery()}>
      <StepList steps={steps}/>
    </CucumberQueryContext.Provider>
  })
