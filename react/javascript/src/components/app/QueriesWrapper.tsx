import React, { useState } from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import SearchQueryContext, { SearchQuery } from '../../SearchQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import EnvelopesQueryContext, {
  EnvelopesQuery,
} from '../../EnvelopesQueryContext'

interface IProps {
  cucumberQuery: CucumberQuery
  gherkinQuery: GherkinQuery
  envelopesQuery: EnvelopesQuery
  query?: string
}

const QueriesWrapper: React.FunctionComponent<IProps> = ({
  gherkinQuery,
  cucumberQuery,
  envelopesQuery,
  query,
  children,
}) => {
  const [currentQuery, setCurrentQuery] = useState(query)

  const searchQuery: SearchQuery = {
    query: currentQuery,
    updateQuery: setCurrentQuery,
  }

  return (
    <div className="cucumber-react">
      <CucumberQueryContext.Provider value={cucumberQuery}>
        <GherkinQueryContext.Provider value={gherkinQuery}>
          <SearchQueryContext.Provider value={searchQuery}>
            <EnvelopesQueryContext.Provider value={envelopesQuery}>
              {children}
            </EnvelopesQueryContext.Provider>
          </SearchQueryContext.Provider>
        </GherkinQueryContext.Provider>
      </CucumberQueryContext.Provider>
    </div>
  )
}

export default QueriesWrapper
