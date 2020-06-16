import React from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import SearchQueryContext from '../../SearchQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import { Query as CucumberQuery } from '@cucumber/query'

interface IProps {
  cucumberQuery: CucumberQuery
  gherkinQuery: GherkinQuery
  query?: string
}

const QueriesWrapper: React.FunctionComponent<IProps> = ({
  gherkinQuery,
  cucumberQuery,
  query,
  children,
}) => {
  const searchQuery = { query: query }

  return (
    <div className="cucumber-react">
      <CucumberQueryContext.Provider value={cucumberQuery}>
        <GherkinQueryContext.Provider value={gherkinQuery}>
          <SearchQueryContext.Provider value={searchQuery}>
            {children}
          </SearchQueryContext.Provider>
        </GherkinQueryContext.Provider>
      </CucumberQueryContext.Provider>
    </div>
  )
}

export default QueriesWrapper
