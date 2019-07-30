import * as React from "react"
import { messages } from "cucumber-messages"
import IDocString = messages.GherkinDocument.Feature.Step.IDocString

interface IProps {
  docString?: IDocString | null
}

const DocString: React.FunctionComponent<IProps> = ({docString}) => {
  if (!docString) {
    return null
  }
  return (
    <pre>{docString.content}</pre>
  )
}

export default DocString
