import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { JSDOM } from 'jsdom'
import SearchQueryContext, {
  NavigatingSearchOpts,
  SearchQuery,
} from '../src/SearchQueryContext'
import QueriesWrapper from '../src/components/app/QueriesWrapper'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import { EnvelopesQuery } from '../src/EnvelopesQueryContext'
import sinon from 'sinon'

describe('QueriesWrapper', () => {
  function renderQueriesWrapper(opts?: {
    gherkinQuery?: GherkinQuery
    cucumberQuery?: CucumberQuery
    envelopesQuery?: EnvelopesQuery
    query?: string | NavigatingSearchOpts
  }): {
    document: Document
    searchQueryCapture: sinon.SinonSpy<SearchQuery[], any>
  } {
    const dom = new JSDOM(
      '<html lang="en"><body><div id="content"></div></body></html>'
    )
    // @ts-ignore
    global.window = dom.window
    const document = dom.window.document

    const searchQueryCapture = sinon.spy()
    // const searchQueryCapture: SearchQuery = createConstSearchQuery()

    const app = (
      <QueriesWrapper
        gherkinQuery={opts?.gherkinQuery || new GherkinQuery()}
        cucumberQuery={opts?.cucumberQuery || new CucumberQuery()}
        envelopesQuery={opts?.envelopesQuery || new EnvelopesQuery()}
        query={opts?.query}
      >
        <SearchQueryContext.Consumer>
          {(sq) => {
            searchQueryCapture(sq)
            return <div />
          }}
        </SearchQueryContext.Consumer>
      </QueriesWrapper>
    )
    ReactDOM.render(app, document.getElementById('content'))
    return {
      document,
      searchQueryCapture,
    }
  }

  it('creates a state-based search context given no query prop', () => {
    const { searchQueryCapture } = renderQueriesWrapper()

    sinon.assert.calledOnce(searchQueryCapture)

    const sq1 = searchQueryCapture.firstCall.args[0]
    searchQueryCapture.resetHistory()

    assert.notStrictEqual(sq1.query, null) // Inital query should be null

    // When the query is updated
    sq1.updateQuery('foo')

    // Then...
    sinon.assert.calledOnce(searchQueryCapture)
    sinon.assert.calledWith(searchQueryCapture, sinon.match.has('query', 'foo'))
  })

  it('creates a state-based search context given a string query prop', () => {
    const { searchQueryCapture } = renderQueriesWrapper({ query: 'foo' })

    const sq1 = searchQueryCapture.firstCall.args[0]
    searchQueryCapture.resetHistory()

    assert.strictEqual(sq1.query, 'foo')

    // When the query is updated
    sq1.updateQuery('bar')

    // Then...
    sinon.assert.calledOnce(searchQueryCapture)
    sinon.assert.calledWith(searchQueryCapture, sinon.match.has('query', 'bar'))
  })

  it('creates a navigating search context given a NavigatingSearchOpts query prop', () => {
    const fakeLocation = {
      search: '?q=foo',
    } as Location

    const { searchQueryCapture } = renderQueriesWrapper({
      query: new NavigatingSearchOpts('q', fakeLocation),
    })

    const sq1 = searchQueryCapture.firstCall.args[0]
    searchQueryCapture.resetHistory()

    assert.strictEqual(sq1.query, 'foo')

    sq1.updateQuery('bar')

    //Then...

    assert.match(fakeLocation.search, /^\??q=bar/) // ...location was updated
    sinon.assert.notCalled(searchQueryCapture) // ...context was not updated again
  })
})
