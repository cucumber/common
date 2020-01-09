import React from 'react'
import Tags from './Tags'
import Keyword from './Keyword'
import Description from './Description'
import Examples from './Examples'
import { messages } from '@cucumber/messages'
import StepList from './StepList'
import IScenario = messages.GherkinDocument.Feature.IScenario

interface IProps {
  scenario: IScenario
}

const Scenario: React.FunctionComponent<IProps> = ({ scenario }) => {
  const examplesList = scenario.examples || []
  return (
    <section>
      <Tags tags={scenario.tags} />
      <h2>
        <Keyword>{scenario.keyword}:</Keyword>{' '}
        <span className="step-text">{scenario.name}</span>
      </h2>
      <div className="indent">
        <Description description={scenario.description} />
        <StepList
          steps={scenario.steps || []}
          renderStepMatchArguments={examplesList.length === 0}
        />

        {examplesList.map((examples, index) => (
          <Examples key={index} examples={examples} />
        ))}
      </div>
    </section>
  )
}

export default Scenario
