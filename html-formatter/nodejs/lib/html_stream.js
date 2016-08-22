import Stream from 'stream'
import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOMServer from 'react-dom/server'
import { GherkinDocument } from './cucumber_react'

class HtmlStream extends Stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(state, _, callback) {
    // TODO: Obviously don't hardcode here
    const html = ReactDOMServer.renderToStaticMarkup(<GherkinDocument node={state.getIn(['sources', 'features/hello.feature'])}/>)
    this.push(html)
    callback()
  }
}

export default HtmlStream