import { SearchQueryCtx, searchFromURLParams } from '../src/SearchQueryContext'
import assert from 'assert'
import sinon from 'sinon'

describe('SearchQueryCtx', () => {
  it('uses the given values in its initial value', () => {
    const sq = SearchQueryCtx.withDefaults({
      query: 'foo bar',
      hiddenStatuses: ['passed'],
    })

    assert.strictEqual(sq.query, 'foo bar')
    assert.deepStrictEqual(sq.hiddenStatuses, ['passed'])
  })

  it('has a blank initial query by default', () => {
    const sq = SearchQueryCtx.withDefaults({})

    assert.strictEqual(sq.query, '')
  })

  it('hides unknown statuses by default', () => {
    const sq = SearchQueryCtx.withDefaults({})

    assert.deepStrictEqual(sq.hiddenStatuses, ['unknown'])
  })

  it('does not change its value on update by default', () => {
    const sq = SearchQueryCtx.withDefaults({ query: 'foo' })

    sq.update({
      query: 'bar',
      hiddenStatuses: ['passed'],
    })

    assert.strictEqual(sq.query, 'foo')
    assert.deepStrictEqual(sq.hiddenStatuses, ['unknown'])
  })

  it("notifies its listener when it's updated", () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = SearchQueryCtx.withDefaults({}, onSearchQueryUpdated)

    sq.update({ query: 'foo' })

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: 'foo',
      hiddenStatuses: sinon.match((s) => s.length === 1 && s[0] === 'unknown'),
    })
  })

  it("notifies its listener when it's updated with blank values", () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = SearchQueryCtx.withDefaults({}, onSearchQueryUpdated)

    sq.update({ query: '', hiddenStatuses: [] })

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: '',
      hiddenStatuses: sinon.match((s) => s.length === 0),
    })
  })
})

describe('searchFromURLParams()', () => {
  it('uses the search parameters from the given URL as its initial value', () => {
    const ret = searchFromURLParams({
      querySearchParam: 'foo',
      hideStatusesSearchParam: 'bar',
      windowUrlApi: {
        getURL: () => 'http://example.org/?foo=search%20text&bar=passed&bar=failed',
        setURL: () => {
          // Do nothing
        },
      },
    })

    assert.strictEqual(ret.query, 'search text')
    assert.deepStrictEqual(ret.hiddenStatuses, ['passed', 'failed'])
  })

  it('uses null values when no search parameters are present', () => {
    const ret = searchFromURLParams({
      querySearchParam: 'search',
      hideStatusesSearchParam: 'hidden',
      windowUrlApi: {
        getURL: () => 'http://example.org',
        setURL: () => {
          // Do nothing
        },
      },
    })

    assert.strictEqual(ret.query, null)
    assert.deepStrictEqual(ret.hiddenStatuses, null)
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
      hiddenStatuses: ['failed', 'pending'],
    })

    sinon.assert.calledOnceWithMatch(
      setURL,
      sinon.match((urlString) => {
        const url = new URL(urlString.toString())
        const hidden = url.searchParams.getAll('bar')
        return (
          url.host === 'example.org' &&
          url.searchParams.get('foo') === '@slow' &&
          url.searchParams.get('baz') === 'sausage' &&
          hidden.length === 2 &&
          hidden.includes('failed') &&
          hidden.includes('pending')
        )
      })
    )
  })
})
