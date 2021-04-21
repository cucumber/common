import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import SearchBar from '../src/components/app/SearchBar'
import { JSDOM } from 'jsdom'
import SearchQueryContext from '../src/SearchQueryContext'
import * as messages from '@cucumber/messages'

describe('SearchBar', () => {
  function renderSearchBar(query?: string, queryUpdated?: (query: string) => any): Document {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const statusesUpdated = () => {
      /*Do nothing*/
    }
    const scenarioCountByStatus = new Map<messages.TestStepResultStatus, number>()

    const app = (
      <SearchQueryContext.Provider
        value={{
          query: query,
          updateQuery:
            queryUpdated ||
            (() => {
              /*Do nothing*/
            }),
        }}
      >
        <SearchBar
          statusesUpdated={statusesUpdated}
          enabledStatuses={[]}
          scenarioCountByStatus={scenarioCountByStatus}
        />
      </SearchQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))
    return document
  }

  it('puts the context query as the initial search text', () => {
    const document = renderSearchBar('keyword')
    const searchTextElems = document.getElementsByName('query')

    assert.strictEqual(searchTextElems.length, 1)

    const searchTextElem = searchTextElems[0] as HTMLInputElement
    assert.strictEqual(searchTextElem.value, 'keyword')
  })

  it('updates the context when the form is submitted', () => {
    let capture = ''

    const document = renderSearchBar(null, (query) => {
      capture = query
    })

    const searchTextElem = document.getElementsByName('query')[0] as HTMLInputElement
    searchTextElem.value = 'search text'

    const searchForm = document.querySelector('.cucumber-search-bar-search') as HTMLFormElement
    searchForm.submit()

    assert.strictEqual(capture, 'search text')
  })

  it('updates the context when the search button is clicked', () => {
    let capture = ''

    const document = renderSearchBar(null, (query) => {
      capture = query
    })

    const searchTextElem = document.getElementsByName('query')[0] as HTMLInputElement
    searchTextElem.value = 'search text'

    const searchButton = document.querySelector(
      '.cucumber-search-bar-search button'
    ) as HTMLButtonElement
    searchButton.click()

    assert.strictEqual(capture, 'search text')
  })

  it("doesn't perform the default form action when submitting", () => {
    let capture: Event = null

    const document = renderSearchBar('keyword')

    document.addEventListener('submit', (event) => {
      capture = event
    })

    const searchForm = document.querySelector('.cucumber-search-bar-search') as HTMLFormElement
    searchForm.submit()

    assert.strictEqual(capture.defaultPrevented, true, 'Form submit action was not prevented.')
  })
})
