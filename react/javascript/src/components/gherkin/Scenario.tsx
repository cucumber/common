import React from 'react'
import Tags from './Tags'
import Description from './Description'
import Examples from './Examples'
import * as messages from '@cucumber/messages'
import StepList from './StepList'
import HookList from './HookList'
import CucumberQueryContext from '../../CucumberQueryContext'
import GherkinQueryContext from '../../GherkinQueryContext'
import UriContext from '../../UriContext'
import Title from './Title'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'

interface IProps {
  scenario: messages.Scenario
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
    <section>
      <Tags tags={scenario.tags} />
      <Title header="h2" id={scenario.id}>
        <Keyword>{scenario.keyword}:</Keyword>
        <HighLight text={scenario.name} />
      </Title>
      <Description description={scenario.description} />
      <ol className="cucumber-steps">
        <HookList hookSteps={beforeHooks} />
        <StepList steps={scenario.steps || []} hasExamples={hasExamples} />
        <HookList hookSteps={afterHooks} />
      </ol>

      {examplesList.map((examples, index) => {
        return <Examples key={index} examples={examples} />
      })}
    </section>
  )
}

export default Scenario
