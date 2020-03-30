import React from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import { Query as CucumberQuery } from '@cucumber/query'

interface IProps {
  cucumberQuery: CucumberQuery
  gherkinQuery: GherkinQuery
}

const QueriesWrapper: React.FunctionComponent<IProps> = ({
  gherkinQuery,
  cucumberQuery,
  children,
}) => {
  return (
    <div className="cucumber-react">
      <CucumberQueryContext.Provider value={cucumberQuery}>
        <GherkinQueryContext.Provider value={gherkinQuery}>
          {children}
        </GherkinQueryContext.Provider>
      </CucumberQueryContext.Provider>
    </div>
  )
}

export default QueriesWrapper
