import React from 'react'
import Keyword from './Keyword'
import ExamplesTable from './ExamplesTable'
import { messages } from 'cucumber-messages'
import Tags from './Tags'
import Description from './Description'
import IExamples = messages.GherkinDocument.Feature.Scenario.IExamples

interface IExamplesProps {
  examples: IExamples
}

const Examples: React.FunctionComponent<IExamplesProps> = ({ examples }) => {
  return (
    <section>
      <Tags tags={examples.tags} />
      <h2>
        <Keyword>{examples.keyword}:</Keyword>{' '}
        <span className="step-text">{examples.name}</span>
      </h2>
      <div className="indent">
        <Description description={examples.description} />
        {examples.tableHeader && (
          <ExamplesTable
            tableHeader={examples.tableHeader}
            tableBody={examples.tableBody}
          />
        )}
      </div>
    </section>
  )
}

export default Examples
