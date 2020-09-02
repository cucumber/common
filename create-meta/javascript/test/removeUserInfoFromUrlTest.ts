import { removeUserInfoFromUrl } from '../src/createMeta'
import assert from 'assert'

describe('removeUserInfoFromUrl', () => {
  it('returns undefined for undefined', () => {
    assert.strictEqual(removeUserInfoFromUrl(undefined), undefined)
  })

  it('returns null for null', () => {
    assert.strictEqual(removeUserInfoFromUrl(null), null)
  })

  it('returns empty string for empty string', () => {
    assert.strictEqual(removeUserInfoFromUrl(null), null)
  })

  it('leaves the data intact when no sensitive information is detected', () => {
    assert.strictEqual(removeUserInfoFromUrl('pretty safe'), 'pretty safe')
  })

  context('with URLs', () => {
    it('leaves intact when no password is found', () => {
      assert.strictEqual(
        removeUserInfoFromUrl('https://example.com/git/repo.git'),
        'https://example.com/git/repo.git'
      )
    })

    it('removes credentials when found', () => {
      assert.strictEqual(
        removeUserInfoFromUrl('http://login@example.com/git/repo.git'),
        'http://example.com/git/repo.git'
      )
    })

    it('removes credentials and passwords when found', () => {
      assert.strictEqual(
        removeUserInfoFromUrl('ssh://login:password@example.com/git/repo.git'),
        'ssh://example.com/git/repo.git'
      )
    })
  })
})
