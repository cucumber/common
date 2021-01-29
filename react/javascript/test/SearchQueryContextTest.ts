import {
  SearchQueryCtx,
  searchFromURLParams
} from '../src/SearchQueryContext'
import assert from 'assert'
import sinon from 'sinon'

describe('SearchQueryCtx', () => {
  it('uses the given values its initial value', () => {
    const sq = new SearchQueryCtx({
      query: 'foo bar',
      hiddenStatuses: ['passed']
    })

    assert.strictEqual(sq.query, 'foo bar')
    assert.deepStrictEqual(sq.hiddenStatuses, ['passed'])
  })

  it('has a blank initial query by default', () => {
    const sq = new SearchQueryCtx({})

    assert.strictEqual(sq.query, '')
  })

  it('hides unknown statuses by default', () => {
    const sq = new SearchQueryCtx({})

    assert.deepStrictEqual(sq.hiddenStatuses, ['unknown'])
  })

  it('does not change its value on update by default', () => {
    const sq = new SearchQueryCtx({query: 'foo'})

    sq.update({
      query: 'bar',
      hiddenStatuses: ['passed']
    })

    assert.strictEqual(sq.query, 'foo')
    assert.deepStrictEqual(sq.hiddenStatuses, ['unknown'])
  })

  it("notifies its listener when it's updated", () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = new SearchQueryCtx({}, onSearchQueryUpdated)

    sq.update({query: 'foo'})

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: 'foo',
      hiddenStatuses: sinon.match(s => s.length === 1 && s[0] === 'unknown')
    })
  })

  it("notifies its listener when it's updated with blank values", () => {
    const onSearchQueryUpdated = sinon.spy()

    const sq = new SearchQueryCtx({}, onSearchQueryUpdated)

    sq.update({query: '', hiddenStatuses: []})

    sinon.assert.calledOnceWithMatch(onSearchQueryUpdated, {
      query: '',
      hiddenStatuses: sinon.match(s => s.length === 0)
    })
  })
})

describe('searchFromURLParams()', () => {

  it("uses the search parameters from the given URL as its initial value", () => {
    const ret = searchFromURLParams(
      'foo', 'bar', () => 'http://example.org?foo=search%20text&bar=passed&bar=failed'
    )

    assert.strictEqual(ret.searchQuery.query, 'search text')
    assert.deepStrictEqual(ret.searchQuery.hiddenStatuses, ['passed', 'failed'])
  })

  it("uses null values when no search parameters are present", () => {
    const ret = searchFromURLParams(
      'search', 'hidden', () => 'http://example.org'
    )

    assert.strictEqual(ret.searchQuery.query, null)
    assert.deepStrictEqual(ret.searchQuery.hiddenStatuses, null)
  })

  it("creates a renderer function that adds parameters to the given URL", () => {
    const ret = searchFromURLParams(
      'foo', 'bar',
      () => 'http://example.org?foo=search%20text&baz=sausage',
    )

    const urlString = ret.renderSearchURL({
      query: '@slow',
      hiddenStatuses: ['failed', 'pending']
    })

    const url = new URL(urlString)
    const hidden = url.searchParams.getAll('bar')
    assert.strictEqual(url.host, 'example.org')
    assert.strictEqual(url.searchParams.get('foo'), '@slow')
    assert.strictEqual(url.searchParams.get('baz'), 'sausage')
    assert.strictEqual(hidden.length, 2)
    assert.strictEqual(hidden.includes('failed'), true)
    assert.strictEqual(hidden.includes('pending'), true)
  })

})
