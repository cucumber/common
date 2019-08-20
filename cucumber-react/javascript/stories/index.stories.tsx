import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from 'cucumber-messages'
import all from '../testdata/all.json'
import makeResultsLookup from '../src/makeResultsLookup'
import App from '../src/components/app/App'
import IGherkinDocument = messages.IGherkinDocument
import ITestStepFinished = messages.ITestStepFinished
import TestStepFinished = messages.TestStepFinished
import IPickle = messages.IPickle
import Pickle = messages.Pickle

function makeDocAndResults(messageList: messages.IEnvelope[]) {
  const gherkinDocuments: IGherkinDocument[] = (messageList.filter(message => message.gherkinDocument)).map(message => messages.GherkinDocument.fromObject(message.gherkinDocument))
  const pickles: IPickle[] = messageList.filter(message => message.pickle).map(message => Pickle.fromObject(message.pickle))
  const testStepFinishedList: ITestStepFinished[] = messageList.filter(message => message.testStepFinished).map(message => TestStepFinished.fromObject(message.testStepFinished))
  const resultsLookup = makeResultsLookup(pickles, testStepFinishedList)
  return { gherkinDocuments, resultsLookup }
}

storiesOf('Features', module)
  .add('All', () => {
    const { gherkinDocuments, resultsLookup } = makeDocAndResults(all as messages.IEnvelope[])
    return <App gherkinDocuments={gherkinDocuments} resultsLookup={resultsLookup}/>
  })
