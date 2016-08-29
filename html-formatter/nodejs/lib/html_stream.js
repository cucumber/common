import Stream from 'stream'
import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOMServer from 'react-dom/server'
import { Cucumber } from './cucumber_react'

class HtmlStream extends Stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(state, _, callback) {
    const html = ReactDOMServer.renderToStaticMarkup(<Cucumber state={state}/>)
    this.push(html)
    callback()
  }
}

export default HtmlStream