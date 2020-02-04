import { PassThrough, pipeline, Readable } from 'stream'
import { BinaryToMessageStream, messages } from '@cucumber/messages'
import ParserMessageStream from './stream/ParserMessageStream'
import SourceMessageStream from './stream/SourceMessageStream'
import Dialect from './Dialect'
import DIALECTS from './gherkin-languages.json'
import IGherkinOptions from './IGherkinOptions'
import makeGherkinOptions from './makeGherkinOptions'

function fromStream(stream: Readable, options: IGherkinOptions) {
  return pipeline(
    stream,
    new BinaryToMessageStream(messages.Envelope.decodeDelimited),
    new ParserMessageStream(options)
  )
}

function fromPaths(paths: string[], options: IGherkinOptions): Readable {
  options = makeGherkinOptions(options)
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
      // Can't use pipeline here because of the { end } argument,
      // so we have to manually propagate errors.
      options
        .createReadStream(path)
        .on('error', err => combinedMessageStream.emit('error', err))
        .pipe(new SourceMessageStream(path))
        .on('error', err => combinedMessageStream.emit('error', err))
        .pipe(parserMessageStream)
        .on('error', err => combinedMessageStream.emit('error', err))
        .pipe(combinedMessageStream, { end })
    }
  }
  pipeSequentially()
  return combinedMessageStream
}

function fromSources(
  envelopes: messages.IEnvelope[],
  options: IGherkinOptions
): Readable {
  options = makeGherkinOptions(options)
  const combinedMessageStream = new PassThrough({
    writableObjectMode: true,
    readableObjectMode: true,
  })

  function pipeSequentially() {
    const envelope = envelopes.shift()
    if (envelope !== undefined && envelope.source) {
      const parserMessageStream = new ParserMessageStream(options)
      parserMessageStream.pipe(combinedMessageStream, {
        end: envelopes.length === 0,
      })
      parserMessageStream.on('end', pipeSequentially)
      parserMessageStream.end(envelope)
    }
  }
  pipeSequentially()

  return combinedMessageStream
}

function dialects(): { [key: string]: Dialect } {
  return DIALECTS
}

export default {
  fromPaths,
  fromStream,
  fromSources,
  dialects,
}
