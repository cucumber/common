import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from 'cucumber-messages'

import statuses from '../testdata/statuses.json'
import rules from '../testdata/rules.json'
import escapedPipes from '../testdata/escaped_pipes.json'
import testJson from '../testdata/test.json'
import IEnvelope = messages.IEnvelope
import IGherkinDocument = messages.IGherkinDocument
import ITestStepFinished = messages.ITestStepFinished
import TestStepFinished = messages.TestStepFinished
import IPickle = messages.IPickle
import Pickle = messages.Pickle
import makeResultsLookup from '../src/makeResultsLookup'
import GherkinDocument from '../src/components/gherkin/GherkinDocument'

// TODO: Process results!!!

/**
 * @param json
 */
function makeDocAndResults(json: messages.IEnvelope[]) {
  const gherkinDocument: IGherkinDocument = (json.find(message => message.gherkinDocument) as IEnvelope).gherkinDocument
  const pickles: IPickle[] = json.filter(message => message.pickle).map(message => Pickle.fromObject(message.pickle))
  const testStepFinishedList: ITestStepFinished[] = json.filter(message => message.testStepFinished).map(message => TestStepFinished.fromObject(message.testStepFinished))
  const resultsLookup = makeResultsLookup(pickles, testStepFinishedList)
  return { gherkinDocument, resultsLookup }
}

storiesOf('Features', module)
  .add('statuses.feature', () => {
    const { gherkinDocument, resultsLookup } = makeDocAndResults(statuses as messages.IEnvelope[])
    return <GherkinDocument gherkinDocument={gherkinDocument} resultsLookup={resultsLookup}/>
  })
  .add('rules.feature', () => {
    const { gherkinDocument, resultsLookup } = makeDocAndResults(rules as messages.IEnvelope[])
    return <GherkinDocument gherkinDocument={gherkinDocument} resultsLookup={resultsLookup}/>
  })
  .add('escaped_pipes.feature', () => {
    const { gherkinDocument, resultsLookup } = makeDocAndResults(escapedPipes as messages.IEnvelope[])
    return <GherkinDocument gherkinDocument={gherkinDocument} resultsLookup={resultsLookup}/>
  })
  .add('test.feature', () => {
    const { gherkinDocument, resultsLookup } = makeDocAndResults(testJson as messages.IEnvelope[])
    return <GherkinDocument gherkinDocument={gherkinDocument} resultsLookup={resultsLookup}/>
  })
