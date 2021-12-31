import { Envelope, TestStepResultStatus } from '@cucumber/messages'
import testData from '../../../acceptance/examples-tables/examples-tables.feature'
import SearchQueryContext, {
  SearchQuery,
  SearchQueryCtx,
  SearchQueryProps,
} from '../../../src/SearchQueryContext'
import { render } from '@testing-library/react'
import { FilteredResults, QueriesWrapper } from '../../../src/components/app'
import assert from 'assert'
import sinon from 'sinon'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { props } from '../../../src/stories/helpers'

describe('FilteredResults', () => {
  function renderFilteredResults(
    searchQuery: SearchQueryProps = {},
    setSearchQuery?: (searchQuery: SearchQuery) => void
  ) {
    return render(
      <QueriesWrapper {...props(testData as Envelope[])}>
        <SearchQueryContext.Provider
          value={SearchQueryCtx.withDefaults(searchQuery, setSearchQuery)}
        >
          <FilteredResults />
        </SearchQueryContext.Provider>
      </QueriesWrapper>
    )
  }

  describe('searching', () => {
    it('puts the context query as the initial search text', () => {
      const { getByRole } = renderFilteredResults({ query: 'keyword' })

      assert.strictEqual(
        (getByRole('textbox', { name: 'Search' }) as HTMLInputElement).value,
        'keyword'
      )
    })

    it('updates the context when the form is submitted', () => {
      const onSearchQueryUpdated = sinon.spy()
      const { getByRole } = renderFilteredResults({}, onSearchQueryUpdated)

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

    it("doesn't perform the default form action when submitting", () => {
      const eventListener = sinon.spy()
      const { getByRole, baseElement } = renderFilteredResults()

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
      const { getByRole } = renderFilteredResults({ query: 'foo' }, onSearchQueryUpdated)

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
    it('should show named status filters, all checked by default', () => {
      const { getAllByRole, getByRole } = renderFilteredResults()

      assert.strictEqual(getAllByRole('checkbox').length, 3)
      assert.ok(getByRole('checkbox', { name: 'passed' }))
      assert.ok(getByRole('checkbox', { name: 'failed' }))
      assert.ok(getByRole('checkbox', { name: 'undefined' }))
      getAllByRole('checkbox').forEach((checkbox: HTMLInputElement) => {
        assert.strictEqual(checkbox.checked, true)
      })
    })

    it('should fire an event to hide a status when unchecked', () => {
      const onSearchQueryUpdated = sinon.spy()
      const { getByRole } = renderFilteredResults({}, onSearchQueryUpdated)

      userEvent.click(getByRole('checkbox', { name: 'undefined' }))

      sinon.assert.calledOnce(onSearchQueryUpdated)
      sinon.assert.calledWith(
        onSearchQueryUpdated,
        sinon.match({
          hideStatuses: [TestStepResultStatus.UNDEFINED],
        })
      )
    })

    it('should show filtered out statuses as unchecked', () => {
      const { getByRole } = renderFilteredResults({
        hideStatuses: [TestStepResultStatus.UNDEFINED],
      })

      assert.strictEqual(
        (getByRole('checkbox', { name: 'passed' }) as HTMLInputElement).checked,
        true
      )
      assert.strictEqual(
        (getByRole('checkbox', { name: 'failed' }) as HTMLInputElement).checked,
        true
      )
      assert.strictEqual(
        (getByRole('checkbox', { name: 'undefined' }) as HTMLInputElement).checked,
        false
      )
    })

    it('should fire to unhide a status when rechecked', () => {
      const onSearchQueryUpdated = sinon.spy()
      const { getByRole } = renderFilteredResults(
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
