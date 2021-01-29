import React, { useState } from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import SearchQueryContext, {
  SearchQueryProps,
  SearchQueryCtx,
} from '../../SearchQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import EnvelopesQueryContext, {
  EnvelopesQuery,
} from '../../EnvelopesQueryContext'

export interface IProps extends SearchQueryProps {
  cucumberQuery: CucumberQuery
  gherkinQuery: GherkinQuery
  envelopesQuery: EnvelopesQuery,
}

const QueriesWrapper: React.FunctionComponent<IProps> = (props) => {
  
  const [searchQuery, setSearchQuery] = useState({
    query: props.query,
    hiddenStatuses: props.hiddenStatuses,
  })

  return (
    <div className="cucumber-react">
      <CucumberQueryContext.Provider value={props.cucumberQuery}>
        <GherkinQueryContext.Provider value={props.gherkinQuery}>
          <SearchQueryContext.Provider value={new SearchQueryCtx(searchQuery, setSearchQuery)}>
            <EnvelopesQueryContext.Provider value={props.envelopesQuery}>
              {props.children}
            </EnvelopesQueryContext.Provider>
          </SearchQueryContext.Provider>
        </GherkinQueryContext.Provider>
      </CucumberQueryContext.Provider>
    </div>
  )
}

export default QueriesWrapper
