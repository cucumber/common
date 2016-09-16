import Stream from "stream"
import React from "react"
import ReactDOMServer from "react-dom/server"
import {CucumberReact} from "cucumber-react"
const {Cucumber} = CucumberReact

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
