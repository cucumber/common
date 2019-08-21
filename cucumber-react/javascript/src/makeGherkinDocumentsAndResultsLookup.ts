import { messages } from 'cucumber-messages'
import makeResultsLookup from './makeResultsLookup'

function makeGherkinDocumentsAndResultsLookup(envelopes: messages.IEnvelope[]) {
  const gherkinDocuments: messages.IGherkinDocument[] = (envelopes.filter(message => message.gherkinDocument)).map(message => messages.GherkinDocument.fromObject(message.gherkinDocument))
  const pickles: messages.IPickle[] = envelopes.filter(message => message.pickle).map(message => messages.Pickle.fromObject(message.pickle))
  const testStepFinishedList: messages.ITestStepFinished[] = envelopes.filter(message => message.testStepFinished).map(message => messages.TestStepFinished.fromObject(message.testStepFinished))
  const resultsLookup = makeResultsLookup(pickles, testStepFinishedList)
  return { gherkinDocuments, resultsLookup }
}

export default makeGherkinDocumentsAndResultsLookup
