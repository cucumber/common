import React from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import CucumberQuery from '@cucumber/query'
import BtoaContext from '../../BtoaContext'

interface IProps {
  cucumberQuery: CucumberQuery
  gherkinQuery: GherkinQuery
  btoa: (data: string) => string
}

const QueriesWrapper: React.FunctionComponent<IProps> = ({
  gherkinQuery,
  cucumberQuery,
  btoa,
  children,
}) => {
  return (
    <div className="cucumber-react">
      <BtoaContext.Provider value={btoa}>
        <CucumberQueryContext.Provider value={cucumberQuery}>
          <GherkinQueryContext.Provider value={gherkinQuery}>
            {children}
          </GherkinQueryContext.Provider>
        </CucumberQueryContext.Provider>
      </BtoaContext.Provider>
    </div>
  )
}

export default QueriesWrapper
