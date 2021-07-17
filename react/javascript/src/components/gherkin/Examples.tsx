import React from 'react'
import { Keyword } from './Keyword'
import { ExamplesTable } from './ExamplesTable'
import { Description } from './Description'
import { Title } from './Title'
import { Tags } from './Tags'
import { Children } from './Children'
import { DefaultComponent, ExamplesProps, useCustomRendering } from '../customise'

const DefaultRenderer: DefaultComponent<ExamplesProps, {}> = ({ examples }) => {
  return (
    <section>
      <Tags tags={examples.tags} />
      <Title header="h2" id={examples.id}>
        <Keyword>{examples.keyword}:</Keyword>
        <span>{examples.name}</span>
      </Title>
      <Description description={examples.description} />
      {examples.tableHeader && (
        <Children>
          <ExamplesTable tableHeader={examples.tableHeader} tableBody={examples.tableBody} />
        </Children>
      )}
    </section>
  )
}

export const Examples: React.FunctionComponent<ExamplesProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<ExamplesProps, {}>('Examples', {}, DefaultRenderer)
  return <ResolvedRenderer {...props} />
}
