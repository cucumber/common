import React from 'react'
import GherkinQueryContext from '../../contexts/GherkinQueryContext'
import CucumberQueryContext from '../../contexts/CucumberQueryContext'
import SearchQueryContext from '../../contexts/SearchQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import { Query as CucumberQuery } from '@cucumber/query'
import EnvelopesQueryContext, {
  EnvelopesQuery,
} from '../../contexts/EnvelopesQueryContext'

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
  const searchQuery = { query: query }

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
