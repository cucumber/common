import { Command } from 'commander'
import packageJson from '../package.json'
import RubyJSONParser from './RubyJSONParser'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import { Readable } from 'stream'
import { messages, MessageToNdjsonStream } from '@cucumber/messages'

import { Query as GherkinQuery } from '@cucumber/gherkin'

const program = new Command()
program.version(packageJson.version)
program.parse(process.argv)

const lines: string[] = []
process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  let chunk
  while ((chunk = process.stdin.read()) !== null) {
    lines.push(chunk)
  }
})

process.stdin.on('end', () => {
  const envelopes = new RubyJSONParser()
    .parse(JSON.parse(lines.join('')))
    .map(gherkinDocument =>
      messages.Envelope.create({
        gherkinDocument,
      })
    )

  const documentStream = Readable.from(envelopes, { objectMode: true })
  const supportCode = new SupportCode()
  const query = new GherkinQuery()
  const outputStream = new MessageToNdjsonStream()
  outputStream.pipe(process.stdout)

  runCucumber(supportCode, documentStream, query, outputStream)
})
