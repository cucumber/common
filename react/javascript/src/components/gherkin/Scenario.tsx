import React from 'react'
import Tags from './Tags'
import Description from './Description'
import Examples from './Examples'
import { messages } from '@cucumber/messages'
import StepList from './StepList'
import IScenario = messages.GherkinDocument.Feature.IScenario
import IdGenerator from '../../IdGenerator'
import ScenarioTitle from './ScenarioTitle'
import AnchorLink from './AnchorLink'

interface IProps {
  scenario: IScenario
}

const generator = new IdGenerator()

const Scenario: React.FunctionComponent<IProps> = ({ scenario }) => {
  const examplesList = scenario.examples || []
  const hasExamples = examplesList.length > 0
  const idGenerated = generator.generate(scenario.name)
  return (
    <div className="indent">
      <section>
        <Tags tags={scenario.tags} />
        <div className="anchored-link">
          <AnchorLink
            id={"#" + idGenerated}
          />
          <ScenarioTitle
            id={idGenerated}
            scenario={scenario}
          />
        </div>
        <Description description={scenario.description} />
        <StepList
          steps={scenario.steps || []}
          renderStepMatchArguments={!hasExamples}
          renderMessage={!hasExamples}
        />

        {examplesList.map((examples, index) => (
          <Examples key={index} examples={examples} />
        ))}
      </section>
    </div>
  )
}

export default Scenario
