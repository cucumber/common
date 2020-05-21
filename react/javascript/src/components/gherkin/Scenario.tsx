import React from 'react'
import Tags from './Tags'
import Keyword from './Keyword'
import Description from './Description'
import Examples from './Examples'
import { messages } from '@cucumber/messages'
import StepList from './StepList'
import HookList from './HookList'
import IScenario = messages.GherkinDocument.Feature.IScenario
import CucumberQueryContext from '../../CucumberQueryContext'
import GherkinQueryContext from '../../GherkinQueryContext'
import UriContext from '../../UriContext'

interface IProps {
  scenario: IScenario
}

const Scenario: React.FunctionComponent<IProps> = ({ scenario }) => {
  const examplesList = scenario.examples || []
  const hasExamples = examplesList.length > 0
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const uri = React.useContext(UriContext)
  const pickleIds = gherkinQuery.getPickleIds(uri, scenario.id)
  const beforeHooks = cucumberQuery.getBeforeHookSteps(pickleIds[0])
  const afterHooks = cucumberQuery.getAfterHookSteps(pickleIds[0])

  return (
    <div className="indent">
      <section>
        <Tags tags={scenario.tags} />
        <h2>
          <Keyword>{scenario.keyword}:</Keyword>{' '}
          <span className="step-text">{scenario.name}</span>
        </h2>
        <Description description={scenario.description} />
        <HookList hookSteps={beforeHooks} />
        <StepList
          steps={scenario.steps || []}
          renderStepMatchArguments={!hasExamples}
          renderMessage={!hasExamples}
        />
        <HookList hookSteps={afterHooks} />

        {examplesList.map((examples, index) => (
          <Examples key={index} examples={examples} />
        ))}
      </section>
    </div>
  )
}

export default Scenario
