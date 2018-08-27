const { spawn } = require('child_process')
const { statSync } = require('fs')
const ExeFile = require('c21e')
const cm = require('cucumber-messages').io.cucumber.messages
const ProtobufMessageStream = require('./ProtobufMessageStream')

module.exports = class Gherkin {
  static fromPaths(paths, options) {
    return new this(paths, [], options).messageStream()
  }

  static fromSources(sources, options) {
    return new this([], sources, options).messageStream()
  }

  constructor(paths, sources, options) {
    this._paths = paths
    this._sources = sources
    this._options = Object.assign(
      {
        includeSource: true,
        includeGherkinDocument: true,
        includePickles: true,
      },
      options
    )
    let gherkinGoDir = `${__dirname}/../../gherkin-go`
    try {
      statSync(gherkinGoDir)
    } catch (err) {
      // Dev mode - we're in src, not dist/src
      gherkinGoDir = `${__dirname}/../gherkin-go`
    }
    this._exeFile = new ExeFile(
      `${gherkinGoDir}/gherkin-go-{{.OS}}-{{.Arch}}{{.Ext}}`
    )
  }

  messageStream() {
    const options = []
    if (!this._options.includeSource) options.push('--no-source')
    if (!this._options.includeGherkinDocument) options.push('--no-ast')
    if (!this._options.includePickles) options.push('--no-pickles')
    const args = options.concat(this._paths)
    const gherkin = spawn(this._exeFile.fileName, args)
    const protobufMessageStream = new ProtobufMessageStream(cm.Wrapper)
    gherkin.on('error', err => {
      protobufMessageStream.emit('error', err)
    })
    gherkin.stdout.pipe(protobufMessageStream)
    for (const source of this._sources) {
      const wrapper = new cm.Wrapper.fromObject({ source })
      gherkin.stdin.write(cm.Wrapper.encodeDelimited(wrapper).finish())
    }
    gherkin.stdin.end()
    return protobufMessageStream
  }
}
