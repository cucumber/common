import path from 'path'
import fs from 'fs'
import { messages } from 'cucumber-messages'
import { CucumberStream, makeDummyHooks, makeDummyStepDefinitions, SupportCode } from 'fake-cucumber'
import gherkin from 'gherkin'
import { Readable } from 'stream'
import React from 'react'
import ReactDOM from 'react-dom'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import CucumberQuery from 'cucumber-query'

describe('App', () => {
  const dir = __dirname + '/../../../gherkin/testdata/good'
  const files = fs.readdirSync(dir)
  const supportCode = new SupportCode()
  makeDummyStepDefinitions(supportCode)
  makeDummyHooks(supportCode)

  for (const file of files) {
    if (file.match(/\.feature$/)) {
      it(`can render ${file}`, async () => {
        const { JSDOM } = require('jsdom')
        const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
        // @ts-ignore
        global.window = dom.window
        // global.navigator = dom.window.navigator
        const document = dom.window.document

        const p = path.join(dir, file)
        const envelopes = await streamToArray(gherkin
          .fromPaths([p], { newId: gherkin.incrementing() })
          .pipe(new CucumberStream(supportCode.stepDefinitions, supportCode.hooks)))

        const gherkinDocuments = envelopes.filter(e => e.gherkinDocument).map(e => e.gherkinDocument)
        const cucumberQuery = envelopes.reduce((q, e) => q.update(e), new CucumberQuery())
        const app = <GherkinDocumentList
          gherkinDocuments={gherkinDocuments}
          cucumberQuery={cucumberQuery}
        />
        ReactDOM.render(app, document.getElementById('content'))
      }).timeout(7000) // TODO: What the hell is taking so long??
    }
  }
})

async function streamToArray(
  readableStream: Readable,
): Promise<messages.IEnvelope[]> {
  return new Promise<messages.IEnvelope[]>(
    (
      resolve: (wrappers: messages.IEnvelope[]) => void,
      reject: (err: Error) => void,
    ) => {
      const items: messages.IEnvelope[] = []
      readableStream.on('data', items.push.bind(items))
      readableStream.on('error', (err: Error) => reject(err))
      readableStream.on('end', () => resolve(items))
    },
  )
}
