import React from "react" // eslint-disable-line no-unused-vars

const Cucumber = ({state}) => <div>
  {Array.from(state.get('sources').keys()).map(uri => <GherkinDocument key={uri} node={state.getIn(['sources', uri])}/>)}
</div>

const GherkinDocument = ({node}) => <div>
  <Feature node={node.get('feature')}/>
</div>

const Feature = ({node}) => <div>
  <h1 className="feature"><span>{node.get('keyword')}: </span><span className="name">{node.get('name')}</span></h1>
</div>

export {Cucumber, GherkinDocument, Feature}