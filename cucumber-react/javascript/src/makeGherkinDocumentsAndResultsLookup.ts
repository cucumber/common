import { messages } from 'cucumber-messages'
import makeResultsLookup from './makeResultsLookup'

function makeGherkinDocumentsAndResultsLookup(envelopes: messages.IEnvelope[]) {
  const gherkinDocuments = (envelopes.filter(message => message.gherkinDocument)).map(message => message.gherkinDocument)
  const pickles = envelopes.filter(message => message.pickle).map(message => message.pickle)
  const testStepFinishedList = envelopes.filter(message => message.testStepFinished).map(message => message.testStepFinished)
  const testCaseFinishedList = envelopes.filter(message => message.testCaseFinished).map(message => message.testCaseFinished)
  const resultsLookup = makeResultsLookup(pickles, testStepFinishedList, testCaseFinishedList)
  return { gherkinDocuments, resultsLookup }
}

export default makeGherkinDocumentsAndResultsLookup
