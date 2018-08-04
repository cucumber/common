const {spawn} = require('child_process')
const ExeFile = require('./exe/ExeFile')
const cm = require('cucumber-messages').io.cucumber.messages
const ProtobufMessageStream = require('./ProtobufMessageStream')

module.exports = class Gherkin {
  constructor(paths, sources, options) {
    this._paths = paths
    this._sources = sources
    this._options = Object.assign({includeSource: true, includeGherkinDocument: true, includePickles: true}, options)
    this._exeFile = new ExeFile(`${__dirname}/../gherkin-go/gherkin-go-{{.OS}}-{{.Arch}}{{.Ext}}`)
  }

  messages() {
    const options = []
    if (!this._options.includeSource) options.push('--no-source')
    if (!this._options.includeGherkinDocument) options.push('--no-ast')
    if (!this._options.includePickles) options.push('--no-pickles')
    const args = options.concat(this._paths)
    const gherkin = spawn(this._exeFile.fileName, args)
    for (const source of this._sources) {
      gherkin.stdin.write(cm.Source.encodeDelimited(source).finish())
    }
    gherkin.stdin.end()
    return gherkin.stdout.pipe(new ProtobufMessageStream(cm.Wrapper))
  }
}