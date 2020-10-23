import path from 'path'
import fs from 'fs'
import { messages } from '@cucumber/messages'
import { GherkinStreams } from '@cucumber/gherkin'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import React from 'react'
import ReactDOM from 'react-dom'
import { JSDOM } from 'jsdom'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import { FilteredResults, QueriesWrapper } from '../src'
import { Query as CucumberQuery } from '@cucumber/query'
import { EnvelopesQuery } from '../src/EnvelopesQueryContext'
import { Writable } from 'stream'
import assert from 'assert'
import createMeta from '@cucumber/create-meta'

async function executeFeature(filepath: string): Promise<messages.IEnvelope[]> {
  const fakeCucumberOutput: messages.IEnvelope[] = []

  const supportCode = new SupportCode()
  const gherkinOptions = {
    defaultDialect: 'en',
    newId: supportCode.newId,
    createReadStream: (path: string) =>
      fs.createReadStream(path, { encoding: 'utf-8' }),
  }
  const gherkinEnvelopeStream = GherkinStreams.fromPaths(
    [filepath],
    gherkinOptions
  )
  const outputStream = new Writable({
    objectMode: true,
    write(
      envelope: messages.IEnvelope,
      encoding: string,
      callback: (error?: Error | null) => void
    ): void {
      fakeCucumberOutput.push(envelope)
      callback()
    },
  })
  outputStream.write(
    new messages.Envelope({
      meta: createMeta('fake-cucumber', 'A.B.C', process.env),
    })
  )
  const gherkinQuery = new GherkinQuery()

  await runCucumber(
    supportCode,
    gherkinEnvelopeStream,
    gherkinQuery,
    outputStream
  )
  return fakeCucumberOutput
}

describe('App', () => {
  const dir = __dirname + '/../../../gherkin/testdata/good'
  const files = fs.readdirSync(dir)

  for (const file of files) {
    if (file.match(/\.feature$/)) {
      it(`can render ${file}`, async () => {
        const envelopes = await executeFeature(path.join(dir, file))
        const gherkinQuery = new GherkinQuery()
        const cucumberQuery = new CucumberQuery()
        const envelopesQuery = new EnvelopesQuery()

        envelopes.forEach((envelope) => {
          gherkinQuery.update(envelope)
          cucumberQuery.update(envelope)
          envelopesQuery.update(envelope)
        })

        assert(
          envelopesQuery.find((env) => !!env.testRunStarted),
          'Nothing has been executed'
        )

        const dom = new JSDOM(
          '<html lang="en"><body><div id="content"></div></body></html>'
        )
        // @ts-ignore
        global.window = dom.window
        // global.navigator = dom.window.navigator
        const document = dom.window.document
        const app = (
          <QueriesWrapper
            gherkinQuery={gherkinQuery}
            cucumberQuery={cucumberQuery}
            envelopesQuery={envelopesQuery}
          >
            <FilteredResults />
          </QueriesWrapper>
        )
        ReactDOM.render(app, document.getElementById('content'))
      }).timeout(10000)
    }
  }
})
