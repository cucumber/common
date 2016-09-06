import React from "react"
import Immutable from "immutable" // eslint-disable-line no-unused-vars

const Cucumber = ({sources}) =>
  <div>
    <h1>Cucumber HTML</h1>
    {Array.from(sources.keys()).map(uri => <GherkinDocument node={sources.get(uri)} key={uri}/>)}
  </div>

Cucumber.propTypes = {
  sources: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

const GherkinDocument = ({node}) =>
  <div>
    <Feature node={node.get('feature')}/>
  </div>

GherkinDocument.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

const Feature = ({node}) =>
  <div>
    <h2 className="feature"><span>{node.get('keyword')}: </span><span className="name">{node.get('name')}</span></h2>
    {Array.from(node.get('children')).map(child => <Scenario node={child} key="TODO-scenario"/>)}
  </div>

Feature.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

const Scenario = ({node}) =>
  <div>
    <h3 className="scenario"><span>{node.get('keyword')}: </span><span className="name">{node.get('name')}</span></h3>
    <ol>
      {Array.from(node.get('steps')).map(step => <Step node={step} key="TODO-step"/>)}
    </ol>
  </div>

Scenario.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

const Step = ({node}) =>
  <li>
    <span className="step"><span>{node.get('keyword')}</span><span className="name">{node.get('name')}</span></span>
  </li>

Step.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

export {Cucumber, GherkinDocument, Feature, Scenario, Step}