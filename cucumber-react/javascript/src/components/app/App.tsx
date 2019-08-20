import React, { useState } from 'react'
import { ResultsLookup } from '../../types'
import { ISelectionPathData } from 'react-sidenav/types'
import GherkinDocument from '../gherkin/GherkinDocument'
import { messages } from 'cucumber-messages'
import GherkinDocumentSideNav from './GherkinDocumentSideNav'

const containerStyle = {
  background: '#FFF',
  border: '1px solid #E5E5E5',
}

interface IProps {
  gherkinDocuments: messages.IGherkinDocument[]
  resultsLookup: ResultsLookup
}

const App: React.FunctionComponent<IProps> = ({ gherkinDocuments, resultsLookup }) => {
  const [selectedUri, setSelectedUri] = useState(gherkinDocuments[0].uri)
  const gherkinDocumentByUri = toMap(gherkinDocuments)

  const selectGherkinDocument = (selectionPath: string, selectionPathData: ISelectionPathData) => {
    setSelectedUri(selectionPath)
  }

  return <div style={containerStyle}>
    <GherkinDocumentSideNav gherkinDocuments={gherkinDocuments} selectedUri={selectedUri} onSelection={selectGherkinDocument}/>
    <div>
      <GherkinDocument gherkinDocument={gherkinDocumentByUri.get(selectedUri)} resultsLookup={resultsLookup}/>
    </div>
  </div>
}

function toMap(gherkinDocuments: messages.IGherkinDocument[]) {
  const map = new Map<string, messages.IGherkinDocument>()
  for (const gdoc of gherkinDocuments) {
    map.set(gdoc.uri, gdoc)
  }
  return map
}

export default App
