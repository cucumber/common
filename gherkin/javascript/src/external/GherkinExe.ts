import { spawn, spawnSync } from 'child_process'
import { statSync } from 'fs'
import { messages, ProtobufMessageStream } from 'cucumber-messages'
import { Readable } from 'stream'
import Dialect from '../Dialect'
import { gherkinOptions, IGherkinOptions } from '../types'

export default class GherkinExe {
  constructor(
    private readonly gherkinExe: string,
    private readonly paths: string[],
    private readonly envelopes: messages.IEnvelope[],
    private readonly options: IGherkinOptions
  ) {
    this.options = gherkinOptions(options)
  }

  public dialects(): { [key: string]: Dialect } {
    const result = spawnSync(this.gherkinExe, ['--dialects'])
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
    const gherkin = spawn(this.gherkinExe, args, {stdio: ['pipe', 'pipe', 'inherit']})
    const protobufMessageStream = new ProtobufMessageStream(
      messages.Envelope.decodeDelimited.bind(messages.Envelope)
    )
    gherkin.on('error', err => {
      protobufMessageStream.emit('error', err)
    })
    gherkin.stdout.pipe(protobufMessageStream)
    for (const envelope of this.envelopes) {
      gherkin.stdin.write(messages.Envelope.encodeDelimited(envelope).finish())
    }
    gherkin.stdin.end()
    return protobufMessageStream
  }
}
