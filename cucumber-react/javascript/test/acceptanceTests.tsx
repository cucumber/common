import path from 'path'
import fs from 'fs'
import { messages } from 'cucumber-messages'
import { FakeTestResultsStream } from 'fake-cucumber'
import * as gherkin from 'gherkin'
import { Readable } from 'stream'
import makeGherkinDocumentsAndResultsLookup from '../src/makeGherkinDocumentsAndResultsLookup'
import App from '../src/components/app/App'
import React from 'react'
import ReactDOM from 'react-dom'

describe('App', () => {
  const dir = __dirname + '/../../../gherkin/testdata/good'
  const files = fs.readdirSync(dir)
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
        const fakeTestResultsStream = new FakeTestResultsStream('protobuf-objects', 'pattern')
        const envelopes = await streamToArray(gherkin
          .fromPaths([p], {})
          .pipe(fakeTestResultsStream))

        const { gherkinDocuments, resultsLookup, stepMatchLookup } = makeGherkinDocumentsAndResultsLookup(envelopes)
        const app = <App
          gherkinDocuments={gherkinDocuments}
          resultsLookup={resultsLookup}
          stepMatchLookup={stepMatchLookup}
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
