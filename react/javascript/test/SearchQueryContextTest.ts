import { SearchQueryCtx, searchFromURLParams } from '../src/SearchQueryContext'
import assert from 'assert'
import sinon from 'sinon'
import { TestStepResultStatus as Status } from '@cucumber/messages'

describe('SearchQueryCtx', () => {
  it('uses the given values in its initial value', () => {
    const sq = SearchQueryCtx.withDefaults({
      query: 'foo bar',
      onlyShowStatuses: [Status.PASSED],
    })

    assert.strictEqual(sq.query, 'foo bar')
    assert.deepStrictEqual(sq.onlyShowStatuses, [Status.PASSED])
  })

  it('has a blank initial query by default', () => {
    const sq = SearchQueryCtx.withDefaults({})

    assert.strictEqual(sq.query, '')
  })

  it('has a null "onlyShow" array by default', () => {
    const sq = SearchQueryCtx.withDefaults({})

    assert.strictEqual(sq.onlyShowStatuses, null)
  })

  it('does not change its value on update by default', () => {
    const sq = SearchQueryCtx.withDefaults({ query: 'foo' })

    sq.update({
      query: 'bar',
      onlyShowStatuses: [Status.PASSED],
    })

    assert.strictEqual(sq.query, 'foo')
    assert.strictEqual(sq.onlyShowStatuses, null)
  })

  it('notifies its listener when the query is updated', () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = SearchQueryCtx.withDefaults(
      { query: 'bar', onlyShowStatuses: [Status.FAILED] },
      onSearchQueryUpdated
    )

    sq.update({ query: 'foo' })

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: 'foo',
      onlyShowStatuses: sinon.match((s) => s.length === 1 && s[0] === Status.FAILED),
    })
  })

  it('notifies its listener when the filters are updated', () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = SearchQueryCtx.withDefaults({}, onSearchQueryUpdated)

    sq.update({ onlyShowStatuses: [Status.PENDING] })

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: '',
      onlyShowStatuses: sinon.match((s) => s.length === 1 && s[0] === Status.PENDING),
    })
  })

  it("notifies its listener when it's updated with blank values", () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = SearchQueryCtx.withDefaults(
      { query: 'foo', onlyShowStatuses: [Status.FAILED] },
      onSearchQueryUpdated
    )

    sq.update({ query: '', onlyShowStatuses: null })

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: '',
      onlyShowStatuses: null,
    })
  })
})

describe('searchFromURLParams()', () => {
  it('uses the search parameters from the given URL as its initial value', () => {
    const ret = searchFromURLParams({
      querySearchParam: 'foo',
      showStatusesSearchParam: 'bar',
      windowUrlApi: {
        getURL: () => 'http://example.org/?foo=search%20text&bar=PASSED&bar=FAILED',
        setURL: () => {
          // Do nothing
        },
      },
    })

    assert.strictEqual(ret.query, 'search text')
    assert.deepStrictEqual(ret.onlyShowStatuses, [Status.PASSED, Status.FAILED])
  })

  it('uses null values when no search parameters are present', () => {
    const ret = searchFromURLParams({
      querySearchParam: 'search',
      showStatusesSearchParam: 'only',
      windowUrlApi: {
        getURL: () => 'http://example.org',
        setURL: () => {
          // Do nothing
        },
      },
    })

    assert.strictEqual(ret.query, null)
    assert.deepStrictEqual(ret.onlyShowStatuses, null)
  })

  it('creates an update function that adds parameters to the given URL', () => {
    const setURL = sinon.spy()
    const ret = searchFromURLParams({
      querySearchParam: 'foo',
      showStatusesSearchParam: 'bar',
      windowUrlApi: {
        getURL: () => 'http://example.org/?foo=search%20text&baz=sausage',
        setURL,
      },
    })

    ret.onSearchQueryUpdated({
      query: '@slow',
      onlyShowStatuses: [Status.FAILED, Status.PENDING],
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
