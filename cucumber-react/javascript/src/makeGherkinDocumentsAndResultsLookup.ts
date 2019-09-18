import { messages } from 'cucumber-messages'
import makeResultsLookup from './makeResultsLookup'
import makeStepMatchLookup from './makeStepMatchLookup'

function makeGherkinDocumentsAndResultsLookup(envelopes: messages.IEnvelope[]) {
  const gherkinDocuments = (envelopes.filter(message => message.gherkinDocument)).map(message => message.gherkinDocument)
  const pickles = envelopes.filter(message => message.pickle).map(message => message.pickle)
  const testStepFinishedList = envelopes.filter(message => message.testStepFinished).map(message => message.testStepFinished)
  const testCaseFinishedList = envelopes.filter(message => message.testCaseFinished).map(message => message.testCaseFinished)
  const resultsLookup = makeResultsLookup(pickles, testStepFinishedList, testCaseFinishedList)

  const testStepMatchedList = envelopes.filter(message => message.testStepMatched).map(message => message.testStepMatched)
  const stepMatchLookup = makeStepMatchLookup(pickles, testStepMatchedList)
  return { gherkinDocuments, resultsLookup, stepMatchLookup }
}

export default makeGherkinDocumentsAndResultsLookup
