import path from 'path'
import fs from 'fs'
import { IdGenerator } from '@cucumber/messages'
import { GherkinStreams, Query as GherkinQuery } from '@cucumber/gherkin'
import React from 'react'
import ReactDOM from 'react-dom'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import { JSDOM } from 'jsdom'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import { QueriesWrapper } from '../src'
import {
  Query as CucumberQuery,
  QueryStream as CucumberQueryStream,
} from '@cucumber/query'

describe('App', () => {
  const dir = __dirname + '/../../../gherkin/testdata/good'
  const files = fs.readdirSync(dir)

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

        const supportCode = new SupportCode()
        const p = path.join(dir, file)
        const gherkinStream = GherkinStreams.fromPaths([p], {
          newId: IdGenerator.incrementing(),
          createReadStream(filePath: string) {
            return fs.createReadStream(filePath, { encoding: 'utf-8' })
          },
        })
        const gherkinQuery = new GherkinQuery()
        const cucumberQuery = new CucumberQuery()
        const cucumberQueryStream = new CucumberQueryStream(cucumberQuery)
        await runCucumber(
          supportCode,
          gherkinStream,
          gherkinQuery,
          cucumberQueryStream
        )
        const app = (
          <QueriesWrapper
            gherkinQuery={gherkinQuery}
            cucumberQuery={cucumberQuery}
          >
            <GherkinDocumentList />
          </QueriesWrapper>
        )
        ReactDOM.render(app, document.getElementById('content'))
      }).timeout(2000)
    }
  }
})
