import * as React from "react"
import Keyword from "./Keyword"
import ExamplesTable from "./ExamplesTable"
import { messages } from "cucumber-messages"
import Tags from "./Tags"
import Description from "./Description"
import IExamples = messages.GherkinDocument.Feature.Scenario.IExamples

interface IExamplesProps {
  examples?: IExamples | null
}

const Examples: React.SFC<IExamplesProps> = ({examples}) => {
  if (!examples) {
    return null
  }
  return (
    <section>
      <Tags tags={examples.tags}/>
      <h2>
        <Keyword>{examples.keyword}</Keyword>: <span>{examples.name}</span>
      </h2>
      <Description description={examples.description}/>
      <ExamplesTable
        tableHeader={examples.tableHeader}
        tableBody={examples.tableBody}
      />
    </section>
  )
}

export default Examples
