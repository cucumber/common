import React from 'react'
import { messages } from '@cucumber/messages'
import IDocString = messages.GherkinDocument.Feature.Step.IDocString
import HighLight from '../app/HighLight'

interface IProps {
  docString: IDocString
}

const DocString: React.FunctionComponent<IProps> = ({ docString }) => {
  return (
    <pre className="cucumber-code cucumber-docstring">
      <HighLight text={docString.content} />
    </pre>
  )
}

export default DocString
