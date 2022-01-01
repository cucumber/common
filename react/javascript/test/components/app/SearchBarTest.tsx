import assert from 'assert'
import React from 'react'
import sinon from 'sinon'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../../../src/components/app'
import { TestStepResultStatus } from '@cucumber/messages'

describe('SearchBar', () => {
  describe('searching', () => {
    it('puts the current query as the initial search text', () => {
      const { getByRole } = render(
        <SearchBar
          query={'keyword'}
          onSearch={sinon.spy()}
          hideStatuses={[]}
          statusesWithScenarios={[]}
          onFilter={sinon.spy()}
        />
      )

      assert.strictEqual(
        (getByRole('textbox', { name: 'Search' }) as HTMLInputElement).value,
        'keyword'
      )
    })

    it('fires an event with the query when the form is submitted', () => {
      const onChange = sinon.spy()
      const { getByRole } = render(
        <SearchBar
          query={'keyword'}
          onSearch={onChange}
          hideStatuses={[]}
          statusesWithScenarios={[]}
          onFilter={sinon.spy()}
        />
      )

      userEvent.type(getByRole('textbox', { name: 'Search' }), 'search text')
      userEvent.keyboard('{Enter}')

      sinon.assert.calledOnce(onChange)
      sinon.assert.calledWith(onChange, sinon.match('search text'))
    })

    it("doesn't perform the default form action when submitting", () => {
      const eventListener = sinon.spy()
      const { getByRole, baseElement } = render(
        <SearchBar
          query={''}
          onSearch={sinon.spy()}
          hideStatuses={[]}
          statusesWithScenarios={[]}
          onFilter={sinon.spy()}
        />
      )

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

    it('fires an event with empty string when empty search is submitted', () => {
      const onChange = sinon.spy()
      const { getByRole } = render(
        <SearchBar
          query={'keyword'}
          onSearch={onChange}
          hideStatuses={[]}
          statusesWithScenarios={[]}
          onFilter={sinon.spy()}
        />
      )

      userEvent.clear(getByRole('textbox', { name: 'Search' }))
      userEvent.keyboard('{Enter}')

      sinon.assert.calledOnce(onChange)
      sinon.assert.calledWith(onChange, sinon.match(''))
    })
  })

  describe('filtering by status', () => {
    it('should not show status filters when no statuses', () => {
      const { queryByRole } = render(
        <SearchBar
          query=""
          onSearch={sinon.spy()}
          statusesWithScenarios={[]}
          hideStatuses={[]}
          onFilter={sinon.spy()}
        />
      )

      assert.strictEqual(queryByRole('checkbox'), null)
    })

    it('should not show status filters when just one status', () => {
      const { queryByRole } = render(
        <SearchBar
          query=""
          onSearch={sinon.spy()}
          statusesWithScenarios={[TestStepResultStatus.PASSED]}
          hideStatuses={[]}
          onFilter={sinon.spy()}
        />
      )

      assert.strictEqual(queryByRole('checkbox'), null)
    })

    it('should show named status filters, all checked by default, when multiple statuses', () => {
      const { getAllByRole, getByRole } = render(
        <SearchBar
          query=""
          onSearch={sinon.spy()}
          statusesWithScenarios={[TestStepResultStatus.PASSED, TestStepResultStatus.FAILED]}
          hideStatuses={[]}
          onFilter={sinon.spy()}
        />
      )

      assert.strictEqual(getAllByRole('checkbox').length, 2)
      assert.ok(getByRole('checkbox', { name: 'passed' }))
      assert.ok(getByRole('checkbox', { name: 'failed' }))
      getAllByRole('checkbox').forEach((checkbox: HTMLInputElement) => {
        assert.strictEqual(checkbox.checked, true)
      })
    })

    it('should fire an event to hide a status when unchecked', () => {
      const onFilter = sinon.spy()
      const { getByRole } = render(
        <SearchBar
          query=""
          onSearch={sinon.spy()}
          statusesWithScenarios={[
            TestStepResultStatus.PASSED,
            TestStepResultStatus.FAILED,
            TestStepResultStatus.PENDING,
          ]}
          hideStatuses={[]}
          onFilter={onFilter}
        />
      )

      userEvent.click(getByRole('checkbox', { name: 'pending' }))

      sinon.assert.calledOnce(onFilter)
      sinon.assert.calledWith(onFilter, sinon.match([TestStepResultStatus.PENDING]))
    })

    it('should show filtered out statuses as unchecked', () => {
      const { getByRole } = render(
        <SearchBar
          query=""
          onSearch={sinon.spy()}
          statusesWithScenarios={[
            TestStepResultStatus.PASSED,
            TestStepResultStatus.FAILED,
            TestStepResultStatus.PENDING,
          ]}
          hideStatuses={[TestStepResultStatus.PENDING]}
          onFilter={sinon.spy()}
        />
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
      const onFilter = sinon.spy()
      const { getByRole } = render(
        <SearchBar
          query=""
          onSearch={sinon.spy()}
          statusesWithScenarios={[
            TestStepResultStatus.PASSED,
            TestStepResultStatus.FAILED,
            TestStepResultStatus.PENDING,
          ]}
          hideStatuses={[TestStepResultStatus.FAILED, TestStepResultStatus.PENDING]}
          onFilter={onFilter}
        />
      )

      userEvent.click(getByRole('checkbox', { name: 'failed' }))

      sinon.assert.calledOnce(onFilter)
      sinon.assert.calledWith(onFilter, sinon.match([TestStepResultStatus.PENDING]))
    })
  })
})
