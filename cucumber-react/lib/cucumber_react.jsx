import React from "react"
import Immutable from "immutable"

const EMPTY_LIST = new Immutable.List()
const EMPTY_MAP = new Immutable.Map()

const Cucumber = ({sources, gutterFn}) =>
  <div>
    <h1>Cucumber HTML</h1>
    {Array.from(sources.keys()).map(uri => <GherkinDocument node={sources.get(uri)}
                                                            uri={uri}
                                                            key={uri}
                                                            gutterFn={gutterFn}/>)}
  </div>

Cucumber.propTypes = {
  sources: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  gutterFn: React.PropTypes.func
}

const GherkinDocument = ({node, uri, gutterFn}) =>
  <div>
    <Feature node={node.get('feature')}
             uri={uri}
             attachmentsByLine={node.get('attachments', EMPTY_MAP)}
             gutterFn={gutterFn}/>
  </div>

GherkinDocument.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  uri: React.PropTypes.string.isRequired,
  gutterFn: React.PropTypes.func
}

const Feature = ({node, uri, attachmentsByLine, gutterFn}) =>
  <div>
    {gutterFn && gutterFn(uri, node.getIn(['location', 'line']), node.getIn(['location', 'column']))}
    <h2 className="feature"><span>{node.get('keyword')}: </span><span className="name">{node.get('name')}</span></h2>
    {Array.from(node.get('children')).map(child => {
      const line = child.getIn(['location', 'line'])
      const key = `${uri}:${line}`
      return <Scenario node={child}
                       uri={uri}
                       attachmentsByLine={attachmentsByLine}
                       gutterFn={gutterFn}
                       key={key}/>
    })}
  </div>

Feature.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  uri: React.PropTypes.string.isRequired,
  attachmentsByLine: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  gutterFn: React.PropTypes.func
}

const Scenario = ({node, uri, attachmentsByLine, gutterFn}) =>
  <div>
    {gutterFn && gutterFn(uri, node.getIn(['location', 'line']), node.getIn(['location', 'column']))}
    <h3 className="scenario"><span>{node.get('keyword')}: </span><span className="name">{node.get('name')}</span></h3>
    <ol>
      {Array.from(node.get('steps')).map(step => {
        const line = step.getIn(['location', 'line'])
        const key = `${uri}:${line}`
        const attachments = attachmentsByLine.get(line, EMPTY_LIST)
        return <Step
          node={step}
          uri={uri}
          attachments={attachments}
          gutterFn={gutterFn}
          key={key}/>
      })}
    </ol>
  </div>


Scenario.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  uri: React.PropTypes.string.isRequired,
  attachmentsByLine: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  gutterFn: React.PropTypes.func
}

const Step = ({node, uri, attachments, gutterFn}) =>
  <li>
    {gutterFn && gutterFn(uri, node.getIn(['location', 'line']), node.getIn(['location', 'column']))}
    <span className="step"><span>{node.get('keyword')}</span><span className="text">{node.get('text')}</span></span>
    {Array.from(attachments).map((attachment, n) => <Attachment
      attachment={attachment}
      key={`${uri}:${node.getIn(['location', 'line'])}@${n}`}/>)}
  </li>

Step.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  uri: React.PropTypes.string.isRequired,
  attachments: React.PropTypes.instanceOf(Immutable.List).isRequired,
  gutterFn: React.PropTypes.func
}

const Attachment = ({attachment}) => {
  const mediaType = attachment.getIn(['media', 'type'])
  const mediaEncoding = attachment.getIn(['media', 'encoding'])
  const data = attachment.get('data')

  if (mediaType && mediaType.match(/^image\//) && mediaEncoding == 'base64') {
    const src = `data:${mediaType};${mediaEncoding},${data}`
    return <div className="attachment">
      <img src={src}/>
    </div>
  }

  if (mediaType && mediaType.match(/^text\/vnd\.cucumber\.stacktrace\.\w+\+plain/) && mediaEncoding == 'utf-8') {
    return <div className="attachment">
      <pre>{data}</pre>
    </div>
  }

  return null
}

Attachment.propTypes = {
  attachment: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

export {Cucumber, GherkinDocument, Feature, Scenario, Step, Attachment}