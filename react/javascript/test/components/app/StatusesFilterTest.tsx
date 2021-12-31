import assert from 'assert'
import { TestStepResultStatus } from '@cucumber/messages'
import sinon from 'sinon'
import userEvent from '@testing-library/user-event'
import { StatusesFilter } from '../../../src/components/app/StatusesFilter'
import { render } from '@testing-library/react'
import React from 'react'

describe('StatusesFilter', () => {
  it('should not show status filters when no statuses', () => {
    const { queryByRole } = render(
      <StatusesFilter statusesWithScenarios={[]} hideStatuses={[]} onChange={sinon.spy()} />
    )

    assert.strictEqual(queryByRole('checkbox'), null)
  })

  it('should not show status filters when just one status', () => {
    const { queryByRole } = render(
      <StatusesFilter
        statusesWithScenarios={[TestStepResultStatus.PASSED]}
        hideStatuses={[]}
        onChange={sinon.spy()}
      />
    )

    assert.strictEqual(queryByRole('checkbox'), null)
  })

  it('should show named status filters, all checked by default, when multiple statuses', () => {
    const { getAllByRole, getByRole } = render(
      <StatusesFilter
        statusesWithScenarios={[TestStepResultStatus.PASSED, TestStepResultStatus.FAILED]}
        hideStatuses={[]}
        onChange={sinon.spy()}
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
    const onChange = sinon.spy()
    const { getByRole } = render(
      <StatusesFilter
        statusesWithScenarios={[
          TestStepResultStatus.PASSED,
          TestStepResultStatus.FAILED,
          TestStepResultStatus.PENDING,
        ]}
        hideStatuses={[]}
        onChange={onChange}
      />
    )

    userEvent.click(getByRole('checkbox', { name: 'pending' }))

    sinon.assert.calledOnce(onChange)
    sinon.assert.calledWith(onChange, sinon.match([TestStepResultStatus.PENDING]))
  })

  it('should show filtered out statuses as unchecked', () => {
    const { getByRole } = render(
      <StatusesFilter
        statusesWithScenarios={[
          TestStepResultStatus.PASSED,
          TestStepResultStatus.FAILED,
          TestStepResultStatus.PENDING,
        ]}
        hideStatuses={[TestStepResultStatus.PENDING]}
        onChange={sinon.spy()}
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
    const onChange = sinon.spy()
    const { getByRole } = render(
      <StatusesFilter
        statusesWithScenarios={[
          TestStepResultStatus.PASSED,
          TestStepResultStatus.FAILED,
          TestStepResultStatus.PENDING,
        ]}
        hideStatuses={[TestStepResultStatus.FAILED, TestStepResultStatus.PENDING]}
        onChange={onChange}
      />
    )

    userEvent.click(getByRole('checkbox', { name: 'failed' }))

    sinon.assert.calledOnce(onChange)
    sinon.assert.calledWith(onChange, sinon.match([TestStepResultStatus.PENDING]))
  })
})
