import Stream from 'stream'
import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOMServer from 'react-dom/server'
import { Cucumber } from './cucumber_react/cucumber_react'

class HtmlStream extends Stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(state, _, callback) {
    var sources = state.get('sources')
    const html = ReactDOMServer.renderToStaticMarkup(<Cucumber sources={sources}/>) + "\n"
    this.push(html)
    callback()
  }
}

export default HtmlStream