import { messages } from 'cucumber-messages'
import React from 'react'
import Feature from './Feature'

interface IProps {
  gherkinDocument: messages.IGherkinDocument
}

const GherkinDocument: React.FunctionComponent<IProps> = ({
                                                            gherkinDocument,
                                                          }) => {
  return (
    <Feature feature={gherkinDocument.feature}/>
  )
}

export default GherkinDocument
