import { IGherkinOptions } from './types'
import { PassThrough, Readable, Writable } from 'stream'
import ParserMessageStream from './stream/ParserMessageStream'
import fs from 'fs'
import SourceMessageStream from './stream/SourceMessageStream'
import { messages, ProtobufMessageStream } from 'cucumber-messages'
import DIALECTS from './gherkin-languages.json'
import Dialect from './Dialect'
import GherkinExe from './external/GherkinExe'

export function fromStream(stream: Readable, options: IGherkinOptions) {
  return stream
    .pipe(new ProtobufMessageStream(messages.Envelope.decodeDelimited))
    .pipe(new ParserMessageStream(options))
}

export function fromPaths(paths: string[], options: IGherkinOptions): Readable {
  if (process.env.GHERKIN_EXECUTABLE) {
    return new GherkinExe(
      process.env.GHERKIN_EXECUTABLE,
      paths,
      [],
      options
    ).messageStream()
  }

  const combinedMessageStream = new PassThrough({
    writableObjectMode: true,
    readableObjectMode: true,
  })

  function pipeSequentially() {
    const path = paths.shift()
    if (path !== undefined) {
      const parserMessageStream = new ParserMessageStream(options)
      parserMessageStream.on('end', () => {
        pipeSequentially()
      })

      const end = paths.length === 0
      fs.createReadStream(path, { encoding: 'utf-8' })
        .pipe(new SourceMessageStream(path))
        .pipe(parserMessageStream)
        .pipe(
          combinedMessageStream,
          { end }
        )
    }
  }
  pipeSequentially()
  return combinedMessageStream
}

export function fromSources(
  envelopes: messages.IEnvelope[],
  options: IGherkinOptions
): Readable {
  if (process.env.GHERKIN_EXECUTABLE) {
    return new GherkinExe(
      process.env.GHERKIN_EXECUTABLE,
      [],
      envelopes,
      options
    ).messageStream()
  }

  const combinedMessageStream = new PassThrough({ objectMode: true })

  function pipeSequentially() {
    const envelope = envelopes.shift()
    if (envelope !== undefined && envelope.source) {
      const parserMessageStream = new ParserMessageStream(options)
      parserMessageStream.pipe(
        combinedMessageStream,
        { end: envelopes.length === 0 }
      )
      parserMessageStream.on('end', pipeSequentially)
      parserMessageStream.end(envelope)
    }
  }
  pipeSequentially()

  return combinedMessageStream
}

export function dialects(): { [key: string]: Dialect } {
  return DIALECTS
}

export default {
  fromStream,
  fromPaths,
  fromSources,
  dialects,
}
