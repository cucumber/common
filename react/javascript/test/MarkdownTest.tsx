import React from 'react'
import ReactDOM from 'react-dom'
import { JSDOM } from 'jsdom'
import { EnvelopesQuery, MDG, QueriesWrapper } from '../src'
import markdown from '../acceptance/markdown/markdown.md'
import * as messages from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import GherkinDocument from '../src/components/gherkin/GherkinDocument'
import UriContext from '../src/UriContext'

describe('Markdown', () => {
  it(`can render markdown as AST`, async () => {
    const envelopes = markdown as readonly messages.Envelope[]
    const gherkinDocument = envelopes.find((e) => e.gherkinDocument).gherkinDocument

    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const app = (
      <QueriesWrapper {...props(envelopes)}>
        <UriContext.Provider value={gherkinDocument.uri}>
          <GherkinDocument gherkinDocument={gherkinDocument} />
        </UriContext.Provider>
      </QueriesWrapper>
    )
    ReactDOM.render(app, document.getElementById('content'))
  })

  it(`can render markdown as Markdown`, async () => {
    const envelopes = markdown as readonly messages.Envelope[]
    const source = envelopes.find((e) => e.source).source

    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const app = (
      <QueriesWrapper {...props(envelopes)}>
        <UriContext.Provider value={source.uri}>
          <MDG uri={source.uri}>{source.data}</MDG>
        </UriContext.Provider>
      </QueriesWrapper>
    )
    ReactDOM.render(app, document.getElementById('content'))
  })
})

function props(envelopes: readonly messages.Envelope[]) {
  const gherkinQuery = new GherkinQuery()
  const cucumberQuery = new CucumberQuery()
  const envelopesQuery = new EnvelopesQuery()
  for (const envelope of envelopes) {
    gherkinQuery.update(envelope)
    cucumberQuery.update(envelope)
    envelopesQuery.update(envelope)
  }
  return { gherkinQuery, cucumberQuery, envelopesQuery }
}
