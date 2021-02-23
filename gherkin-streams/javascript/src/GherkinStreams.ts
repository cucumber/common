import { PassThrough, pipeline, Readable } from 'stream'
import { messages } from '@cucumber/messages'
import { BinaryToMessageStream } from '@cucumber/message-streams'
import ParserMessageStream from './ParserMessageStream'
import SourceMessageStream from './SourceMessageStream'
import fs from 'fs'
import { IGherkinOptions } from '@cucumber/gherkin'
import makeGherkinOptions from './makeGherkinOptions'

function fromStream(stream: Readable, options: IGherkinOptions) {
  return pipeline(
    stream,
    new BinaryToMessageStream(messages.Envelope.decodeDelimited),
    new ParserMessageStream(options)
  )
}

function fromPaths(paths: ReadonlyArray<string>, options: IGherkinOptions): Readable {
  const pathsCopy = paths.slice()
  options = makeGherkinOptions(options)
  const combinedMessageStream = new PassThrough({
    writableObjectMode: true,
    readableObjectMode: true,
  })

  function pipeSequentially() {
    const path = pathsCopy.shift()
    if (path !== undefined) {
      const parserMessageStream = new ParserMessageStream(options)
      parserMessageStream.on('end', () => {
        pipeSequentially()
      })

      const end = pathsCopy.length === 0
      // Can't use pipeline here because of the { end } argument,
      // so we have to manually propagate errors.
      fs.createReadStream(path, { encoding: 'utf-8' })
        .on('error', (err) => combinedMessageStream.emit('error', err))
        .pipe(new SourceMessageStream(path))
        .on('error', (err) => combinedMessageStream.emit('error', err))
        .pipe(parserMessageStream)
        .on('error', (err) => combinedMessageStream.emit('error', err))
        .pipe(combinedMessageStream, { end })
    }
  }
  pipeSequentially()
  return combinedMessageStream
}

function fromSources(
  envelopes: ReadonlyArray<messages.IEnvelope>,
  options: IGherkinOptions
): Readable {
  const envelopesCopy = envelopes.slice()
  options = makeGherkinOptions(options)
  const combinedMessageStream = new PassThrough({
    writableObjectMode: true,
    readableObjectMode: true,
  })

  function pipeSequentially() {
    const envelope = envelopesCopy.shift()
    if (envelope !== undefined && envelope.source) {
      const parserMessageStream = new ParserMessageStream(options)
      parserMessageStream.pipe(combinedMessageStream, {
        end: envelopesCopy.length === 0,
      })
      parserMessageStream.on('end', pipeSequentially)
      parserMessageStream.end(envelope)
    }
  }
  pipeSequentially()

  return combinedMessageStream
}

export default {
  fromPaths,
  fromStream,
  fromSources,
}
