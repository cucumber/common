import React from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import { GherkinDocumentList } from '../..'

const AllGherkinDocuments: React.FunctionComponent = () => {
  const gherkinQuery = React.useContext(GherkinQueryContext)

  return (
    <GherkinDocumentList
      gherkinDocuments={gherkinQuery.getGherkinDocuments()}
    />
  )
}

export default AllGherkinDocuments
