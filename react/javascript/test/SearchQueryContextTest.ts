import { SearchQueryCtx, searchFromURLParams } from '../src/SearchQueryContext'
import assert from 'assert'
import sinon from 'sinon'
import { TestStepResultStatus as Status } from '@cucumber/messages'

describe('SearchQueryCtx', () => {
  it('uses the given values in its initial value', () => {
    const sq = SearchQueryCtx.withDefaults({
      query: 'foo bar',
      hideStatuses: [Status.PASSED],
    })

    assert.strictEqual(sq.query, 'foo bar')
    assert.deepStrictEqual(sq.hideStatuses, [Status.PASSED])
  })

  it('has a blank initial query by default', () => {
    const sq = SearchQueryCtx.withDefaults({})

    assert.strictEqual(sq.query, '')
  })

  it('hides no statuses by default', () => {
    const sq = SearchQueryCtx.withDefaults({})

    assert.deepStrictEqual(sq.hideStatuses, [])
  })

  it('does not change its value on update by default', () => {
    const sq = SearchQueryCtx.withDefaults({ query: 'foo' })

    sq.update({
      query: 'bar',
      hideStatuses: [Status.PASSED],
    })

    assert.strictEqual(sq.query, 'foo')
    assert.deepStrictEqual(sq.hideStatuses, [])
  })

  it('notifies its listener when the query is updated', () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = SearchQueryCtx.withDefaults(
      { query: 'bar', hideStatuses: [Status.FAILED] },
      onSearchQueryUpdated
    )

    sq.update({ query: 'foo' })

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: 'foo',
      hideStatuses: sinon.match((s) => s.length === 1 && s[0] === Status.FAILED),
    })
  })

  it('notifies its listener when the filters are updated', () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = SearchQueryCtx.withDefaults({}, onSearchQueryUpdated)

    sq.update({ hideStatuses: [Status.PENDING] })

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: '',
      hideStatuses: sinon.match((s) => s.length === 1 && s[0] === Status.PENDING),
    })
  })

  it("notifies its listener when it's updated with blank values", () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = SearchQueryCtx.withDefaults(
      { query: 'foo', hideStatuses: [Status.FAILED] },
      onSearchQueryUpdated
    )

    sq.update({ query: '', hideStatuses: [] })

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: '',
      hideStatuses: sinon.match((s) => s.length === 0),
    })
  })
})

describe('searchFromURLParams()', () => {
  it('uses the search parameters from the given URL as its initial value', () => {
    const ret = searchFromURLParams({
      querySearchParam: 'foo',
      hideStatusesSearchParam: 'bar',
      windowUrlApi: {
        getURL: () => 'http://example.org/?foo=search%20text&bar=PASSED&bar=FAILED',
        setURL: () => {
          // Do nothing
        },
      },
    })

    assert.strictEqual(ret.query, 'search text')
    assert.deepStrictEqual(ret.hideStatuses, [Status.PASSED, Status.FAILED])
  })

  it('uses null values when no search parameters are present', () => {
    const ret = searchFromURLParams({
      querySearchParam: 'search',
      hideStatusesSearchParam: 'hide',
      windowUrlApi: {
        getURL: () => 'http://example.org',
        setURL: () => {
          // Do nothing
        },
      },
    })

    assert.strictEqual(ret.query, null)
    assert.deepStrictEqual(ret.hideStatuses, [])
  })

  it('creates an update function that adds parameters to the given URL', () => {
    const setURL = sinon.spy()
    const ret = searchFromURLParams({
      querySearchParam: 'foo',
      hideStatusesSearchParam: 'bar',
      windowUrlApi: {
        getURL: () => 'http://example.org/?foo=search%20text&baz=sausage',
        setURL,
      },
    })

    ret.onSearchQueryUpdated({
      query: '@slow',
      hideStatuses: [Status.FAILED, Status.PENDING],
    })

    sinon.assert.calledOnceWithMatch(
      setURL,
      sinon.match((urlString) => {
        const url = new URL(urlString.toString())
        const show = url.searchParams.getAll('bar')
        return (
          url.host === 'example.org' &&
          url.searchParams.get('foo') === '@slow' &&
          url.searchParams.get('baz') === 'sausage' &&
          show.length === 2 &&
          show.includes('FAILED') &&
          show.includes('PENDING')
        )
      })
    )
  })
})
