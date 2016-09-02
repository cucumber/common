import React from "react"
import Immutable from "immutable" // eslint-disable-line no-unused-vars

const Cucumber = ({sources}) =>
  <div>
    <h1>Cucumber HTML</h1>
    {Array.from(sources.keys()).map(uri => <GherkinDocument key={uri}
                                                            node={sources.get(uri)}/>)}
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
    <h1 className="feature"><span>{node.get('keyword')}: </span><span className="name">{node.get('name')}</span></h1>
  </div>

Feature.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

export {Cucumber, GherkinDocument, Feature}