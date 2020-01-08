import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from 'cucumber-messages'
import StepList from '../src/components/gherkin/StepList'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import CucumberQuery from 'cucumber-query'
import CucumberQueryContext from '../src/CucumberQueryContext';
import '../src/styles/react-accessible-accordion.css'
import '../src/styles/styles.css'

// @ts-ignore
import ndjson from '../testdata/all.ndjson'
import { GherkinQuery } from 'gherkin'
const envelopes: messages.IEnvelope[] = ndjson.trim().split('\n')
  .map((json: string) => messages.Envelope.fromObject(JSON.parse(json)))

storiesOf('Features', module)
  .add('Document list', () => {
    const gherkinDocuments = envelopes.filter(e => e.gherkinDocument).map(e => e.gherkinDocument)
    const gherkinQuery = new GherkinQuery()
    const cucumberQuery = new CucumberQuery(gherkinQuery)
    for (const envelope of envelopes) {
      gherkinQuery.update(envelope)
      cucumberQuery.update(envelope)
    }
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
      getStepResults(uri: string, lineNumber: number): messages.ITestResult[] {
        return [];
      }

      getStepMatchArgumentsLists(uri: string, lineNumber: number): messages.TestCase.TestStep.IStepMatchArgumentsList[] {
        return [new messages.TestCase.TestStep.StepMatchArgumentsList({
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
        })]
      }
    }

  return <CucumberQueryContext.Provider value={new StubCucumberQuery(new GherkinQuery())}>
      <StepList steps={steps} renderStepMatchArguments={true}/>
    </CucumberQueryContext.Provider>
  })
