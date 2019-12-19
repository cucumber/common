import React from 'react'
import Tags from './Tags'
import Keyword from './Keyword'
import Description from './Description'
import Examples from './Examples'
import { messages } from 'cucumber-messages'
import StepList from './StepList'
import { H2, Indent, StepText, Section } from './html'
import IScenario = messages.GherkinDocument.Feature.IScenario

interface IProps {
  scenario: IScenario
}

const Scenario: React.FunctionComponent<IProps> = ({ scenario }) => {
  const examplesList = scenario.examples || []
  return (
    <Section>
      <Tags tags={scenario.tags} />
      <H2>
        <Keyword>{scenario.keyword}:</Keyword>{' '}
        <StepText>{scenario.name}</StepText>
      </H2>
      <Indent>
        <Description description={scenario.description} />
        <StepList
          steps={scenario.steps || []}
          renderStepMatchArguments={examplesList.length === 0}
        />

        {examplesList.map((examples, index) => (
          <Examples key={index} examples={examples} />
        ))}
      </Indent>
    </Section>
  )
}

export default Scenario
