import assert from 'assert'
import React from 'react'
import sinon from 'sinon'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../../../src/components/app'

describe('SearchBar', () => {
  it('puts the current query as the initial search text', () => {
    const { getByRole } = render(<SearchBar query={'keyword'} onSearch={sinon.spy()} />)

    assert.strictEqual(
      (getByRole('textbox', { name: 'Search' }) as HTMLInputElement).value,
      'keyword'
    )
  })

  it('fires an event with the query when the form is submitted', () => {
    const onChange = sinon.spy()
    const { getByRole } = render(<SearchBar query={'keyword'} onSearch={onChange} />)

    userEvent.type(getByRole('textbox', { name: 'Search' }), 'search text')
    userEvent.keyboard('{Enter}')

    sinon.assert.calledOnce(onChange)
    sinon.assert.calledWith(onChange, sinon.match('search text'))
  })

  it("doesn't perform the default form action when submitting", () => {
    const eventListener = sinon.spy()
    const { getByRole, baseElement } = render(<SearchBar query={''} onSearch={sinon.spy()} />)

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
    const { getByRole } = render(<SearchBar query={'keyword'} onSearch={onChange} />)

    userEvent.clear(getByRole('textbox', { name: 'Search' }))
    userEvent.keyboard('{Enter}')

    sinon.assert.calledOnce(onChange)
    sinon.assert.calledWith(onChange, sinon.match(''))
  })
})
