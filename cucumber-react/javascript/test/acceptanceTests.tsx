import path from 'path'
import fs from 'fs'
import { IdGenerator, messages } from 'cucumber-messages'
import gherkin, { GherkinQuery } from 'gherkin'
import { Readable } from 'stream'
import React from 'react'
import ReactDOM from 'react-dom'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import CucumberQuery from 'cucumber-query'
import SupportCode from 'fake-cucumber/dist/src/SupportCode'
import makeDummyStepDefinitions from 'fake-cucumber/dist/test/makeDummyStepDefinitions'
import makeDummyHooks from 'fake-cucumber/dist/test/makeDummyHooks'
import CucumberStream from 'fake-cucumber/dist/src/CucumberStream'
import PerfHooksClock from 'fake-cucumber/dist/src/PerfHooksClock'
import { JSDOM } from 'jsdom'

describe('App', () => {
  const dir = __dirname + '/../../../gherkin/testdata/good'
  const files = fs.readdirSync(dir)
  const newId = IdGenerator.uuid()
  const clock = new PerfHooksClock()
  const supportCode = new SupportCode(newId, clock)
  makeDummyStepDefinitions(supportCode)
  makeDummyHooks(supportCode)

  for (const file of files) {
    if (file.match(/\.feature$/)) {
      it(`can render ${file}`, async () => {
        const dom = new JSDOM(
          '<html lang="en"><body><div id="content"></div></body></html>'
        )
        // @ts-ignore
        global.window = dom.window
        // global.navigator = dom.window.navigator
        const document = dom.window.document

        const p = path.join(dir, file)
        const envelopes = await streamToArray(
          gherkin
            .fromPaths([p], {
              newId: IdGenerator.incrementing(),
              createReadStream(filePath: string) {
                return fs.createReadStream(filePath, { encoding: 'utf-8' })
              },
            })
            .pipe(
              new CucumberStream(
                supportCode.parameterTypes,
                supportCode.stepDefinitions,
                supportCode.beforeHooks,
                supportCode.afterHooks,
                newId,
                clock
              )
            )
        )

        const gherkinDocuments = envelopes
          .filter(e => e.gherkinDocument)
          .map(e => e.gherkinDocument)
        const gherkinQuery = new GherkinQuery()
        const cucumberQuery = new CucumberQuery(gherkinQuery)
        envelopes.forEach(envelope => {
          gherkinQuery.update(envelope)
          cucumberQuery.update(envelope)
        })

        const app = (
          <GherkinDocumentList
            gherkinDocuments={gherkinDocuments}
            cucumberQuery={cucumberQuery}
          />
        )
        ReactDOM.render(app, document.getElementById('content'))
      }).timeout(7000) // TODO: What the hell is taking so long??
    }
  }
})

async function streamToArray(
  readableStream: Readable
): Promise<messages.IEnvelope[]> {
  return new Promise<messages.IEnvelope[]>(
    (
      resolve: (wrappers: messages.IEnvelope[]) => void,
      reject: (err: Error) => void
    ) => {
      const items: messages.IEnvelope[] = []
      readableStream.on('data', items.push.bind(items))
      readableStream.on('error', (err: Error) => reject(err))
      readableStream.on('end', () => resolve(items))
    }
  )
}
