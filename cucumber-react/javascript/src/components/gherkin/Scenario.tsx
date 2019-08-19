import * as React from 'react'
import Tags from './Tags'
import Keyword from './Keyword'
import Description from './Description'
import Step from './Step'
import Examples from './Examples'
import { messages } from 'cucumber-messages'
import IScenario = messages.GherkinDocument.Feature.IScenario

interface IProps {
  scenario: IScenario
}

/*
 * TODO: status
 *
 * As we loop over steps, we look up a status for the current step's line.
 * We'll look this up in a StatusLookup object which is passed as props.
 *
 * StatusLookup must also be able to return an array of statuses for a line.
 * This is useful for Background steps (which will run once for each scenario).
 *
 * The StatusLookup object can be built by traversing pickles and results.
 * Pickles have back-refs to the AST via URL and Location.
 * Results have back-refs to Pickles.
 *
 * We'll TDD this StatusLookup using canned messages.
 */

const Scenario: React.FunctionComponent<IProps> = ({ scenario }) => {
  return (
    <section>
      <Tags tags={scenario.tags}/>
      <h2>
        <Keyword>{scenario.keyword}</Keyword>: <span>{scenario.name}</span>
      </h2>
      <Description description={scenario.description}/>
      <ol>
        {(scenario.steps || []).map((step, index) => (
          <Step key={index} step={step}/>
        ))}
      </ol>

      {(scenario.examples || []).map((examples, index) => (
        <Examples key={index} examples={examples}/>
      ))}
    </section>
  )
}

export default Scenario
