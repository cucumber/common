import React from 'react'
import { messages } from '@cucumber/messages'
import { GherkinQuery } from '@cucumber/gherkin'
import CucumberQuery from '@cucumber/query'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import BtoaContext from '../../BtoaContext'

interface IProps {
  envelopes: messages.IEnvelope[]
  btoa: (data: string) => string
}

const Wrapper: React.FunctionComponent<IProps> = ({
  envelopes,
  btoa,
  children,
}) => {
  const gherkinQuery = new GherkinQuery()
  const cucumberQuery = new CucumberQuery()
  envelopes.forEach(envelope => {
    gherkinQuery.update(envelope)
    cucumberQuery.update(envelope)
  })

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

export default Wrapper
