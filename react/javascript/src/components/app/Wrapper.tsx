import React from 'react'
import { messages } from '@cucumber/messages'
import { GherkinQuery } from '@cucumber/gherkin'
import { StepMatchArgumentsQuery, TestResultsQuery } from '@cucumber/query'
import GherkinQueryContext from '../../GherkinQueryContext'
import StepMatchArgumentsQueryContext from '../../StepMatchArgumentsQueryContext'
import TestResultsQueryContext from '../../TestResultsQueryContext'

interface IProps {
  envelopes: messages.IEnvelope[]
}

const Wrapper: React.FunctionComponent<IProps> = ({ envelopes, children }) => {
  const gherkinQuery = new GherkinQuery()
  const testResultsQuery = new TestResultsQuery()
  const stepMatchArgumentsQuery = new StepMatchArgumentsQuery()
  envelopes.forEach(envelope => {
    gherkinQuery.update(envelope)
    testResultsQuery.update(envelope)
    stepMatchArgumentsQuery.update(envelope)
  })

  return (
    <div className="cucumber-react">
      <StepMatchArgumentsQueryContext.Provider value={stepMatchArgumentsQuery}>
        <TestResultsQueryContext.Provider value={testResultsQuery}>
          <GherkinQueryContext.Provider value={gherkinQuery}>
            {children}
          </GherkinQueryContext.Provider>
        </TestResultsQueryContext.Provider>
      </StepMatchArgumentsQueryContext.Provider>
    </div>
  )
}

export default Wrapper
