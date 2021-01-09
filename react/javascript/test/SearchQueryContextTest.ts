import {
  createConstSearchQuery,
  createNavigatingSearchQuery,
  NavigatingSearchOpts,
} from '../src/SearchQueryContext'
import assert from 'assert'

describe('Const search query', () => {
  it('uses the given string as its initial value', () => {
    const sq = createConstSearchQuery('foo bar')

    assert.strictEqual(sq.query, 'foo bar')
  })

  it('has a blank initial value by default', () => {
    const sq = createConstSearchQuery()

    assert.notStrictEqual(sq.query, null)
  })

  it('does not change its value on update', () => {
    const sq = createConstSearchQuery('foo')

    sq.updateQuery('bar')

    assert.strictEqual(sq.query, 'foo')
  })
})

describe('Navigating search query', () => {
  function fakeLocation(): Location {
    return { search: null } as Location
  }

  it('changes the given Location on update', () => {
    const location = fakeLocation()
    const sq = createNavigatingSearchQuery(
      new NavigatingSearchOpts('foo', location)
    )

    sq.updateQuery('bar')

    assert.match(location.search, /\??foo=bar/)
  })

  it("uses the given Location's search part for its initial value", () => {
    const location = fakeLocation()
    location.search = 'baz=quux&apples=oranges'

    const sq = createNavigatingSearchQuery(
      new NavigatingSearchOpts('baz', location)
    )

    assert.strictEqual(sq.query, 'quux')
  })

  it('leaves other search parameters intact', () => {
    const location = fakeLocation()
    location.search = '?baz=quux&apples=oranges'

    const sq = createNavigatingSearchQuery(
      new NavigatingSearchOpts('baz', location)
    )

    sq.updateQuery('foo')

    const searchParams = new URLSearchParams(location.search)

    assert.strictEqual(searchParams.get('baz'), 'foo')
    assert.strictEqual(searchParams.get('apples'), 'oranges')
  })
})
