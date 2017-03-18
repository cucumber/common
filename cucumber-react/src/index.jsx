const React = require('react')
const Immutable = require('immutable')

const EMPTY_LIST = new Immutable.List()
const EMPTY_MAP = new Immutable.Map()

const Cucumber = ({sources}) =>
  <div>
    <h1>Cucumber HTML</h1>
    {Array.from(sources.keys()).map(uri => <GherkinDocument node={sources.get(uri)} uri={uri} key={uri}/>)}
  </div>

Cucumber.propTypes = {
  sources: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

const GherkinDocument = ({node, uri}) =>
  <div>
    <Feature node={node.get('feature')} uri={uri} attachmentsByLine={node.get('attachments', EMPTY_MAP)}/>
  </div>

GherkinDocument.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  uri: React.PropTypes.string.isRequired
}

const Feature = ({node, uri, attachmentsByLine}) =>
  <div>
    <h2 className="feature"><span>{node.get('keyword')}: </span><span className="name">{node.get('name')}</span></h2>
    {Array.from(node.get('children')).map(child => {
      const line = child.getIn(['location', 'line'])
      const key = `${uri}:${line}`
      return <Scenario node={child}
                       attachmentsByLine={attachmentsByLine}
                       uri={uri}
                       key={key}/>
    })}
  </div>

Feature.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  uri: React.PropTypes.string.isRequired,
  attachmentsByLine: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

const Scenario = ({node, uri, attachmentsByLine}) =>
  <div>
    <h3 className="scenario"><span>{node.get('keyword')}: </span><span className="name">{node.get('name')}</span></h3>
    <ol>
      {Array.from(node.get('steps')).map(step => {
        const line = step.getIn(['location', 'line'])
        const key = `${uri}:${line}`
        const attachments = attachmentsByLine.get(line, EMPTY_LIST)
        return <Step
          node={step}
          attachments={attachments}
          uri={uri}
          key={key}/>
      })}
    </ol>
  </div>


Scenario.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  uri: React.PropTypes.string.isRequired,
  attachmentsByLine: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

const Step = ({node, uri, attachments}) =>
  <li>
    <span className="step"><span>{node.get('keyword')}</span><span className="text">{node.get('text')}</span></span>
    {Array.from(attachments).map((attachment, n) => <Attachment
      attachment={attachment}
      key={`${uri}:${node.getIn(['location', 'line'])}@${n}`}/>)}
  </li>

Step.propTypes = {
  node: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  uri: React.PropTypes.string.isRequired,
  attachments: React.PropTypes.instanceOf(Immutable.List).isRequired
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

module.exports = {Cucumber, GherkinDocument, Feature, Scenario, Step, Attachment}
