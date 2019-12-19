import React from 'react'
import { messages } from 'cucumber-messages'
import IDocString = messages.GherkinDocument.Feature.Step.IDocString

interface IProps {
  docString: IDocString
}

const DocString: React.FunctionComponent<IProps> = ({ docString }) => {
  return <pre>{docString.content}</pre>
}

export default DocString
