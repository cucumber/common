import React from 'react'
import Keyword from './Keyword'
import ExamplesTable from './ExamplesTable'
import * as messages from '@cucumber/messages'
import Tags from './Tags'
import Description from './Description'
import Title from './Title'

interface IExamplesProps {
  examples: messages.Examples
}

const Examples: React.FunctionComponent<IExamplesProps> = ({ examples }) => {
  return (
    <section>
      <Tags tags={examples.tags} />
      <Title header="h2" id={examples.id}>
        <Keyword>{examples.keyword}:</Keyword>
        <span>{examples.name}</span>
      </Title>
      <Description description={examples.description} />
      {examples.tableHeader && (
        <div className="cucumber-children">
          <ExamplesTable tableHeader={examples.tableHeader} tableBody={examples.tableBody} />
        </div>
      )}
    </section>
  )
}

export default Examples
