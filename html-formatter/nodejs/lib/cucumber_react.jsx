import React from 'react' // eslint-disable-line no-unused-vars

const GherkinDocument = ({node}) => <div>
  <Feature node={node.feature}/>
</div>

const Feature = ({node}) => <div>
  <h1><span>{node.keyword}: </span><span>{node.name}</span></h1>
</div>

export { GherkinDocument, Feature }