import { spawn, spawnSync } from 'child_process'
import { statSync } from 'fs'
import { ExeFile } from 'c21e'
import { messages, ProtobufMessageStream } from 'cucumber-messages'
import { Readable } from 'stream'

const defaultOptions = {
  defaultDialect: 'en',
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

function dialects() {
  return new Gherkin([], [], {}).dialects()
}

interface IGherkinOptions {
  defaultDialect?: string
  includeSource?: boolean
  includeGherkinDocument?: boolean
  includePickles?: boolean
}

interface Dialect {
  name: string
  native: string
  feature: readonly string[]
  background: readonly string[]
  rule: readonly string[]
  scenario: readonly string[]
  scenarioOutline: readonly string[]
  examples: readonly string[]
  given: readonly string[]
  when: readonly string[]
  then: readonly string[]
  and: readonly string[]
  but: readonly string[]
}

export { fromPaths, fromSources, dialects }

class Gherkin {
  private exeFile: ExeFile

  constructor(
    private readonly paths: string[],
    private readonly sources: messages.Source[],
    private readonly options: IGherkinOptions
  ) {
    this.options = { ...defaultOptions, ...options }
    let executables = `${__dirname}/../../executables`
    try {
      statSync(executables)
    } catch (err) {
      // Dev mode - we're in src, not dist/src
      executables = `${__dirname}/../executables`
      statSync(executables)
    }
    this.exeFile = new ExeFile(
      `${executables}/gherkin-{{.OS}}-{{.Arch}}{{.Ext}}`
    )
    statSync(this.exeFile.fileName)
  }

  public dialects(): { [key: string]: Dialect } {
    const result = spawnSync(this.exeFile.fileName, ['--dialects'])
    return JSON.parse(result.stdout)
  }

  public messageStream(): Readable {
    const options = ['--default-dialect', this.options.defaultDialect]
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
      const envelope = messages.Envelope.fromObject({ source })
      gherkin.stdin.write(messages.Envelope.encodeDelimited(envelope).finish())
    }
    gherkin.stdin.end()
    return protobufMessageStream
  }
}
