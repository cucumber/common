import React, { useState } from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import SearchQueryContext, {
  SearchQuery,
  NavigatingSearchOpts,
  createNavigatingSearchQuery,
} from '../../SearchQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import EnvelopesQueryContext, {
  EnvelopesQuery,
} from '../../EnvelopesQueryContext'

interface IProps {
  cucumberQuery: CucumberQuery
  gherkinQuery: GherkinQuery
  envelopesQuery: EnvelopesQuery
  query?: string | NavigatingSearchOpts
}

const QueriesWrapper: React.FunctionComponent<IProps> = ({
  gherkinQuery,
  cucumberQuery,
  envelopesQuery,
  query,
  children,
}) => {
  let searchQuery: SearchQuery

  if (query == null || typeof query === 'string') {
    const [currentQuery, setCurrentQuery] = useState(query as string)

    searchQuery = {
      query: currentQuery,
      updateQuery: setCurrentQuery,
    }
  } else {
    searchQuery = createNavigatingSearchQuery(query)
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
