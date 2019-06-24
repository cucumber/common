import { spawn } from 'child_process'
import { statSync } from 'fs'
import ExeFile from 'c21e'
import { messages, ProtobufMessageStream } from 'cucumber-messages'

const defaultOptions = {
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
}

function fromPaths(paths: string[], options: IGherkinOptions = defaultOptions) {
  return new Gherkin(paths, [], options).messageStream()
}

function fromSources(
  sources: messages.Source[],
  options: IGherkinOptions = defaultOptions
) {
  return new Gherkin([], sources, options).messageStream()
}

export interface IGherkinOptions {
  includeSource: boolean
  includeGherkinDocument: boolean
  includePickles: boolean
}

export { fromPaths, fromSources }

class Gherkin {
  private exeFile: ExeFile

  constructor(
    private readonly paths: string[],
    private readonly sources: messages.Source[],
    private options: IGherkinOptions
  ) {
    this.options = { ...defaultOptions, ...options }
    let gherkinGoDir = `${__dirname}/../../gherkin-go`
    try {
      statSync(gherkinGoDir)
    } catch (err) {
      // Dev mode - we're in src, not dist/src
      gherkinGoDir = `${__dirname}/../gherkin-go`
    }
    this.exeFile = new ExeFile(
      `${gherkinGoDir}/gherkin-go-{{.OS}}-{{.Arch}}{{.Ext}}`
    )
  }

  public messageStream() {
    const options = []
    if (!this.options.includeSource) {
      options.push('--no-source')
    }
    if (!this.options.includeGherkinDocument) {
      options.push('--no-ast')
    }
    if (!this.options.includePickles) {
      options.push('--no-pickles')
    }
    const args = options.concat(this.paths)
    const gherkin = spawn(this.exeFile.fileName, args)
    const protobufMessageStream = new ProtobufMessageStream(
      messages.Envelope.decodeDelimited.bind(messages.Envelope)
    )
    gherkin.on('error', err => {
      protobufMessageStream.emit('error', err)
    })
    gherkin.stdout.pipe(protobufMessageStream)
    for (const source of this.sources) {
      const wrapper = messages.Envelope.fromObject({ source })
      gherkin.stdin.write(messages.Envelope.encodeDelimited(wrapper).finish())
    }
    gherkin.stdin.end()
    return protobufMessageStream
  }
}
