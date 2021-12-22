import assert from 'assert'
import React from 'react'
import sinon from 'sinon'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SearchBar } from '../../../src/components/app'
import SearchQueryContext, {
  SearchQuery,
  SearchQueryCtx,
  SearchQueryProps,
} from '../../../src/SearchQueryContext'

describe('SearchBar', () => {
  function renderSearchBar(
    searchQuery: SearchQueryProps = {},
    setSearchQuery?: (searchQuery: SearchQuery) => void
  ) {
    return render(
      <SearchQueryContext.Provider value={SearchQueryCtx.withDefaults(searchQuery, setSearchQuery)}>
        <SearchBar statusesWithScenarios={[]} />
      </SearchQueryContext.Provider>
    )
  }

  it('puts the context query as the initial search text', () => {
    const { getByRole } = renderSearchBar({ query: 'keyword' })

    assert.strictEqual(
      (getByRole('textbox', { name: 'Search' }) as HTMLInputElement).value,
      'keyword'
    )
  })

  it('updates the context when the form is submitted', () => {
    const onSearchQueryUpdated = sinon.spy()
    const { getByRole } = renderSearchBar({}, onSearchQueryUpdated)

    userEvent.type(getByRole('textbox', { name: 'Search' }), 'search text')
    userEvent.keyboard('{Enter}')

    sinon.assert.calledOnce(onSearchQueryUpdated)
    sinon.assert.calledWith(
      onSearchQueryUpdated,
      sinon.match({
        query: 'search text',
      })
    )
  })

  it('updates the context when the search button is clicked', () => {
    const onSearchQueryUpdated = sinon.spy()
    const { getByRole } = renderSearchBar({}, onSearchQueryUpdated)

    userEvent.type(getByRole('textbox', { name: 'Search' }), 'search text')
    userEvent.click(getByRole('button'))

    sinon.assert.calledOnce(onSearchQueryUpdated)
    sinon.assert.calledWith(
      onSearchQueryUpdated,
      sinon.match({
        query: 'search text',
      })
    )
  })

  it("doesn't perform the default form action when submitting", () => {
    const eventListener = sinon.spy()
    const { getByRole, baseElement } = renderSearchBar()

    baseElement.ownerDocument.addEventListener('submit', eventListener)

    userEvent.type(getByRole('textbox', { name: 'Search' }), 'search text')
    userEvent.keyboard('{Enter}')

    sinon.assert.calledOnce(eventListener)
    sinon.assert.calledWith(
      eventListener,
      sinon.match({
        defaultPrevented: true,
      })
    )
  })

  it('updates the context when a blank search is submitted', () => {
    const onSearchQueryUpdated = sinon.spy()
    const { getByRole } = renderSearchBar({ query: 'foo' }, onSearchQueryUpdated)

    userEvent.clear(getByRole('textbox', { name: 'Search' }))
    userEvent.keyboard('{Enter}')

    sinon.assert.calledOnce(onSearchQueryUpdated)
    sinon.assert.calledWith(
      onSearchQueryUpdated,
      sinon.match({
        query: '',
      })
    )
  })
})
