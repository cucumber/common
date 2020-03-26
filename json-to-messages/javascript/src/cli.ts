import { Command } from 'commander'
import packageJson from '../package.json'
import { runCucumber } from '@cucumber/fake-cucumber'
import { Readable } from 'stream'
import {
  messages,
  MessageToNdjsonStream,
  IdGenerator,
} from '@cucumber/messages'

import { compile, Query as GherkinQuery } from '@cucumber/gherkin'
import AstMaker from './AstMaker'
import { traverseFeature } from './RubyJSONTraverse'
import { IFeature } from './RubyJSONSchema'
import PredictableSupportCode from './PredictableSupportCode'

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
  const idGenerator = IdGenerator.uuid()
  const supportCode = new PredictableSupportCode()

  const astMaker = new AstMaker()
  const json = JSON.parse(lines.join(''))
  const documents: messages.IGherkinDocument[] = json.map(
    (document: IFeature) => traverseFeature(document, astMaker, supportCode)
  )
  documents.forEach(gherkinDocument => {
    envelopes.push(messages.Envelope.create({ gherkinDocument }))

    compile(gherkinDocument, gherkinDocument.uri, idGenerator).forEach(pickle =>
      envelopes.push(messages.Envelope.create({ pickle }))
    )
  })

  // new RubyJSONParser(idGenerator, supportCode)
  //   .parse(JSON.parse(lines.join('')))
  //   .forEach(gherkinDocument => {
  //     compile(
  //       gherkinDocument,
  //       gherkinDocument.uri,
  //       idGenerator
  //     ).forEach(pickle => pickles.push(pickle))

  //     envelopes.push(
  //       messages.Envelope.create({
  //         gherkinDocument,
  //       })
  //     )
  //   })

  // pickles.forEach(pickle =>
  //   envelopes.push(
  //     messages.Envelope.create({
  //       pickle,
  //     })
  //   )
  // )

  const documentStream = Readable.from(envelopes, { objectMode: true })
  const query = new GherkinQuery()
  const outputStream = new MessageToNdjsonStream()
  outputStream.pipe(process.stdout)

  runCucumber(supportCode, documentStream, query, outputStream)
})
