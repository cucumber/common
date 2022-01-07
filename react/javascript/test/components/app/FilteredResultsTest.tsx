import { Envelope } from '@cucumber/messages'
import SearchQueryContext, { useSearchQueryCtx } from '../../../src/SearchQueryContext'
import { FilteredResults } from '../../../src/components/app'
import assert from 'assert'
import userEvent from '@testing-library/user-event'
import React, { VoidFunctionComponent } from 'react'
import { EnvelopesWrapper } from '../../../src/components/app/EnvelopesWrapper'
import attachments from '../../../acceptance/attachments/attachments.feature'
import examplesTables from '../../../acceptance/examples-tables/examples-tables.feature'
import minimal from '../../../acceptance/minimal/minimal.feature'
import { render } from '@testing-library/react'

describe('FilteredResults', () => {
  const TestableFilteredResults: VoidFunctionComponent<{ envelopes: Envelope[] }> = ({
    envelopes,
  }) => {
    return (
      <EnvelopesWrapper envelopes={envelopes}>
        <SearchQueryContext.Provider value={useSearchQueryCtx({})}>
          <FilteredResults />
        </SearchQueryContext.Provider>
      </EnvelopesWrapper>
    )
  }

  describe('searching', () => {
    it('shows a message for a search term that yields no results', () => {
      const { getByRole, getByText } = render(
        <TestableFilteredResults envelopes={attachments as Envelope[]} />
      )

      userEvent.type(getByRole('textbox', { name: 'Search' }), 'nope!')
      userEvent.keyboard('{Enter}')

      assert.ok(getByText('No matches found for your query "nope!" and/or filters'))
    })

    it('narrows the results with a valid search term, and restores when we clear the search', () => {
      const { getByRole, queryByRole } = render(
        <TestableFilteredResults envelopes={attachments as Envelope[]} />
      )

      userEvent.type(getByRole('textbox', { name: 'Search' }), 'json')
      userEvent.keyboard('{Enter}')
      userEvent.click(getByRole('button', { name: 'features/attachments/attachments.feature' }))

      assert.ok(getByRole('heading', { name: 'Scenario: Log JSON' }))
      assert.strictEqual(queryByRole('heading', { name: 'Scenario: Log text' }), null)

      userEvent.clear(getByRole('textbox', { name: 'Search' }))
      userEvent.keyboard('{Enter}')

      assert.ok(getByRole('heading', { name: 'Scenario: Log JSON' }))
      assert.ok(getByRole('heading', { name: 'Scenario: Log text' }))
    })
  })

  describe('filtering by status', () => {
    it('should not show filters when only one status', () => {
      const { queryByRole } = render(<TestableFilteredResults envelopes={minimal as Envelope[]} />)

      assert.strictEqual(queryByRole('checkbox'), null)
    })

    it('should show named status filters, all checked by default', () => {
      const { getAllByRole, getByRole } = render(
        <TestableFilteredResults envelopes={examplesTables as Envelope[]} />
      )

      assert.strictEqual(getAllByRole('checkbox').length, 3)
      assert.ok(getByRole('checkbox', { name: 'passed' }))
      assert.ok(getByRole('checkbox', { name: 'failed' }))
      assert.ok(getByRole('checkbox', { name: 'undefined' }))
      getAllByRole('checkbox').forEach((checkbox: HTMLInputElement) => {
        assert.strictEqual(checkbox.checked, true)
      })
    })

    it('should hide features with a certain status when we uncheck it', () => {
      const { getByRole, queryByRole } = render(
        <TestableFilteredResults envelopes={[...examplesTables, ...minimal] as Envelope[]} />
      )

      assert.ok(getByRole('heading', { name: 'features/examples-tables/examples-tables.feature' }))
      assert.ok(getByRole('heading', { name: 'features/minimal/minimal.feature' }))

      userEvent.click(getByRole('checkbox', { name: 'passed' }))

      assert.ok(getByRole('heading', { name: 'features/examples-tables/examples-tables.feature' }))
      assert.strictEqual(
        queryByRole('heading', {
          name: 'features/minimal/minimal.feature',
        }),
        null
      )
    })

    it('should show a message if we filter all statuses out', () => {
      const { getByRole, queryByRole, getByText } = render(
        <TestableFilteredResults envelopes={examplesTables as Envelope[]} />
      )

      assert.ok(getByRole('heading', { name: 'features/examples-tables/examples-tables.feature' }))

      userEvent.click(getByRole('checkbox', { name: 'passed' }))
      userEvent.click(getByRole('checkbox', { name: 'failed' }))
      userEvent.click(getByRole('checkbox', { name: 'undefined' }))

      assert.strictEqual(
        queryByRole('heading', {
          name: 'features/examples-tables/examples-tables.feature',
        }),
        null
      )
      assert.ok(getByText('No matches found for your filters'))
    })
  })
})
