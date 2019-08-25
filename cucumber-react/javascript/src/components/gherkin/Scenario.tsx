import React from 'react'
import Tags from './Tags'
import Keyword from './Keyword'
import Description from './Description'
import Examples from './Examples'
import { messages } from 'cucumber-messages'
import StepList from './StepList'
import IScenario = messages.GherkinDocument.Feature.IScenario

interface IProps {
  scenario: IScenario
}

const Scenario: React.FunctionComponent<IProps> = ({ scenario }) => {
  return (
    <section>
      <Tags tags={scenario.tags}/>
      <h2>
        <Keyword>{scenario.keyword}</Keyword>: <span>{scenario.name}</span>
      </h2>
      <Description description={scenario.description}/>
      <StepList steps={scenario.steps || []}/>

      {(scenario.examples || []).map((examples, index) => (
        <Examples key={index} examples={examples}/>
      ))}
    </section>
  )
}

export default Scenario
