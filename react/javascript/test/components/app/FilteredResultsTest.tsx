import { Envelope, TestStepResultStatus } from '@cucumber/messages'
import testData from '../../../acceptance/examples-tables/examples-tables.feature'
import SearchQueryContext, {
  SearchQuery,
  SearchQueryCtx,
  SearchQueryProps,
} from '../../../src/SearchQueryContext'
import { render } from '@testing-library/react'
import { FilteredResults } from '../../../src/components/app'
import assert from 'assert'
import sinon from 'sinon'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { EnvelopesWrapper } from '../../../src/components/app/EnvelopesWrapper'

describe('FilteredResults', () => {
  function renderFilteredResults(
    searchQuery: SearchQueryProps = {},
    setSearchQuery?: (searchQuery: SearchQuery) => void
  ) {
    return render(
      <EnvelopesWrapper envelopes={testData as Envelope[]}>
        <SearchQueryContext.Provider
          value={SearchQueryCtx.withDefaults(searchQuery, setSearchQuery)}
        >
          <FilteredResults />
        </SearchQueryContext.Provider>
      </EnvelopesWrapper>
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

    it('updates the context when a search is triggered', () => {
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
