import assert from 'assert'
import React from 'react'
import sinon from 'sinon'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestStepResultStatus } from '@cucumber/messages'

import { SearchBar } from '../../../src/components/app'
import SearchQueryContext, {
  SearchQuery,
  SearchQueryCtx,
  SearchQueryProps,
} from '../../../src/SearchQueryContext'

describe('SearchBar', () => {
  function renderSearchBar(
    statusesWithScenarios: TestStepResultStatus[] = [],
    searchQuery: SearchQueryProps = {},
    setSearchQuery?: (searchQuery: SearchQuery) => void
  ) {
    return render(
      <SearchQueryContext.Provider value={SearchQueryCtx.withDefaults(searchQuery, setSearchQuery)}>
        <SearchBar statusesWithScenarios={statusesWithScenarios} />
      </SearchQueryContext.Provider>
    )
  }

  describe('searching', () => {
    it('puts the context query as the initial search text', () => {
      const { getByRole } = renderSearchBar([], { query: 'keyword' })

      assert.strictEqual(
        (getByRole('textbox', { name: 'Search' }) as HTMLInputElement).value,
        'keyword'
      )
    })

    it('updates the context when the form is submitted', () => {
      const onSearchQueryUpdated = sinon.spy()
      const { getByRole } = renderSearchBar([], {}, onSearchQueryUpdated)

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
      const { getByRole } = renderSearchBar([], {}, onSearchQueryUpdated)

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
      const { getByRole } = renderSearchBar([], { query: 'foo' }, onSearchQueryUpdated)

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

  describe('filtering by status', () => {
    it('should not show status filters when no statuses', () => {
      const { queryByRole } = renderSearchBar([])

      assert.strictEqual(queryByRole('checkbox'), null)
    })

    it('should not show status filters when just one status', () => {
      const { queryByRole } = renderSearchBar([TestStepResultStatus.PASSED])

      assert.strictEqual(queryByRole('checkbox'), null)
    })

    it('should show named status filters, all checked by default, when multiple statuses', () => {
      const { getAllByRole, getByRole } = renderSearchBar([
        TestStepResultStatus.PASSED,
        TestStepResultStatus.FAILED,
      ])

      assert.strictEqual(getAllByRole('checkbox').length, 2)
      assert.ok(getByRole('checkbox', { name: 'passed' }))
      assert.ok(getByRole('checkbox', { name: 'failed' }))
      getAllByRole('checkbox').forEach((checkbox: HTMLInputElement) => {
        assert.strictEqual(checkbox.checked, true)
      })
    })

    it('should fire an event to hide a status when unchecked', () => {
      const onSearchQueryUpdated = sinon.spy()
      const { getByRole } = renderSearchBar(
        [TestStepResultStatus.PASSED, TestStepResultStatus.FAILED, TestStepResultStatus.PENDING],
        {},
        onSearchQueryUpdated
      )

      userEvent.click(getByRole('checkbox', { name: 'pending' }))

      sinon.assert.calledOnce(onSearchQueryUpdated)
      sinon.assert.calledWith(
        onSearchQueryUpdated,
        sinon.match({
          hideStatuses: [TestStepResultStatus.PENDING],
        })
      )
    })

    it('should show filtered out statuses as unchecked', () => {
      const { getByRole } = renderSearchBar(
        [TestStepResultStatus.PASSED, TestStepResultStatus.FAILED, TestStepResultStatus.PENDING],
        { hideStatuses: [TestStepResultStatus.PENDING] }
      )

      assert.strictEqual(
        (getByRole('checkbox', { name: 'passed' }) as HTMLInputElement).checked,
        true
      )
      assert.strictEqual(
        (getByRole('checkbox', { name: 'failed' }) as HTMLInputElement).checked,
        true
      )
      assert.strictEqual(
        (getByRole('checkbox', { name: 'pending' }) as HTMLInputElement).checked,
        false
      )
    })

    it('should fire to unhide a status when rechecked', () => {
      const onSearchQueryUpdated = sinon.spy()
      const { getByRole } = renderSearchBar(
        [TestStepResultStatus.PASSED, TestStepResultStatus.FAILED, TestStepResultStatus.PENDING],
        { hideStatuses: [TestStepResultStatus.FAILED, TestStepResultStatus.PENDING] },
        onSearchQueryUpdated
      )

      userEvent.click(getByRole('checkbox', { name: 'failed' }))

      sinon.assert.calledOnce(onSearchQueryUpdated)
      sinon.assert.calledWith(
        onSearchQueryUpdated,
        sinon.match({
          hideStatuses: [TestStepResultStatus.PENDING],
        })
      )
    })
  })
})
