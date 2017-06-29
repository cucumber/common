const Stream = require('stream')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { Cucumber } = require('cucumber-react')

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

module.exports = HtmlStream
