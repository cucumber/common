import * as React from "react"
import DataTable from "./DataTable"
import Keyword from "./Keyword"
import DocString from "./DocString"
import { messages } from "cucumber-messages"
import IStep = messages.GherkinDocument.Feature.IStep

interface IProps {
  step: IStep
}

const Step: React.FunctionComponent<IProps> = ({step}) => {
  return (
    <li>
      <Keyword>{step.keyword}</Keyword><span>{step.text}</span>
      <DataTable dataTable={step.dataTable}/>
      <DocString docString={step.docString}/>
    </li>
  )
}

export default Step
