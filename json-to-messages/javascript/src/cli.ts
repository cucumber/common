import { Command } from 'commander'
import packageJson from '../package.json'
import RubyJSONParser from './RubyJSONParser'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import { Readable } from 'stream'
import {
  messages,
  MessageToNdjsonStream,
  IdGenerator,
} from '@cucumber/messages'

import { compile, Query as GherkinQuery } from '@cucumber/gherkin'

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
  const envelopes: messages.IEnvelope[] = []
  const pickles: messages.IPickle[] = []
  const idGenerator = IdGenerator.uuid()
  const supportCode = new SupportCode()

  new RubyJSONParser(idGenerator, supportCode)
    .parse(JSON.parse(lines.join('')))
    .forEach(gherkinDocument => {
      compile(
        gherkinDocument,
        gherkinDocument.uri,
        idGenerator
      ).forEach(pickle => pickles.push(pickle))

      envelopes.push(
        messages.Envelope.create({
          gherkinDocument,
        })
      )
    })

  pickles.forEach(pickle =>
    envelopes.push(
      messages.Envelope.create({
        pickle,
      })
    )
  )

  const documentStream = Readable.from(envelopes, { objectMode: true })
  const query = new GherkinQuery()
  const outputStream = new MessageToNdjsonStream()
  outputStream.pipe(process.stdout)

  runCucumber(supportCode, documentStream, query, outputStream)
})
