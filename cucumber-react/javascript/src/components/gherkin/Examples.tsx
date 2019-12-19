import React from 'react'
import Keyword from './Keyword'
import ExamplesTable from './ExamplesTable'
import { messages } from 'cucumber-messages'
import Tags from './Tags'
import Description from './Description'
import { H2, Indent, StepText, Section } from './html'
import IExamples = messages.GherkinDocument.Feature.Scenario.IExamples

interface IExamplesProps {
  examples: IExamples
}

const Examples: React.FunctionComponent<IExamplesProps> = ({ examples }) => {
  return (
    <Section>
      <Tags tags={examples.tags} />
      <H2>
        <Keyword>{examples.keyword}:</Keyword>{' '}
        <StepText>{examples.name}</StepText>
      </H2>
      <Indent>
        <Description description={examples.description} />
        {examples.tableHeader && (
          <ExamplesTable
            tableHeader={examples.tableHeader}
            tableBody={examples.tableBody}
          />
        )}
      </Indent>
    </Section>
  )
}

export default Examples
