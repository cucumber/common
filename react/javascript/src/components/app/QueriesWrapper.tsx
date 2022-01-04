import React from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import EnvelopesQueryContext, { EnvelopesQuery } from '../../EnvelopesQueryContext'

interface IProps {
  cucumberQuery: CucumberQuery
  gherkinQuery: GherkinQuery
  envelopesQuery: EnvelopesQuery
}

export const QueriesWrapper: React.FunctionComponent<IProps> = (props) => (
  <CucumberQueryContext.Provider value={props.cucumberQuery}>
    <GherkinQueryContext.Provider value={props.gherkinQuery}>
      <EnvelopesQueryContext.Provider value={props.envelopesQuery}>
        {props.children}
      </EnvelopesQueryContext.Provider>
    </GherkinQueryContext.Provider>
  </CucumberQueryContext.Provider>
)
