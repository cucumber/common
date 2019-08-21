import { messages } from 'cucumber-messages'
import { ResultsLookup } from '../../types'
import * as React from 'react'
import Feature from './Feature'
import GherkinDocumentContext from '../../GherkinDocumentContext'
import UriContext from '../../UriContext'

interface IProps {
  gherkinDocument: messages.IGherkinDocument
  resultsLookup: ResultsLookup
}

const GherkinDocument: React.FunctionComponent<IProps> = ({
                                                            gherkinDocument,
                                                            resultsLookup,
                                                          }) => {
  return (
    <UriContext.Provider value={gherkinDocument.uri}>
      <GherkinDocumentContext.Provider value={resultsLookup}>
        <Feature feature={gherkinDocument.feature}/>
      </GherkinDocumentContext.Provider>
    </UriContext.Provider>
  )
}

export default GherkinDocument
