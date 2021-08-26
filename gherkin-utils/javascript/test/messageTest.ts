import * as messages from '@cucumber/messages'
import { NdjsonToMessageStream } from '@cucumber/message-streams'
import { Writable, pipeline } from 'stream'

import { GherkinDocumentWalker } from '../src/index.js'
import fs from 'fs'
import glob from 'glob'
import { promisify } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const asyncPipeline = promisify(pipeline)

describe('Walking with messages', () => {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const localMessageFiles = glob.sync(`${__dirname}/messages/**/*.ndjson`)
  const tckMessageFiles = glob.sync(
    `${__dirname}/../../../compatibility-kit/javascript/features/**/*.ndjson`
  )
  const messageFiles = [].concat(localMessageFiles, tckMessageFiles)

  for (const messageFile of messageFiles) {
    it(`can walk through GherkinDocuments in ${messageFile}`, async () => {
      const messageStream = new NdjsonToMessageStream()

      await asyncPipeline(
        fs.createReadStream(messageFile, 'utf-8'),
        messageStream,
        new Writable({
          objectMode: true,
          write(
            envelope: messages.Envelope,
            _encoding: string,
            callback: (error?: Error | null) => void
          ) {
            try {
              if (envelope.gherkinDocument) {
                const walker = new GherkinDocumentWalker()
                walker.walkGherkinDocument(envelope.gherkinDocument)
              }
              callback()
            } catch (error) {
              error.message += `\n${envelope.gherkinDocument.uri}\n`
              callback(error)
            }
          },
        })
      )
    }).timeout(30000)
  }
})
