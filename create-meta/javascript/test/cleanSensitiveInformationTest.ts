import { cleanSensitiveInformation } from '../src/createMeta'
import assert from 'assert'

describe('cleanSensitiveInformation', () => {
  it('leaves the data intact when no sensitive information is detected', () => {
    assert.strictEqual(cleanSensitiveInformation('pretty safe'), 'pretty safe')
  })

  context('with URLs', () => {
    it('leaves intact when no password is found', () => {
      assert.strictEqual(
        cleanSensitiveInformation('https://example.com/git/repo.git'),
        'https://example.com/git/repo.git'
      )
    })

    it('removes credentials when found', () => {
      assert.strictEqual(
        cleanSensitiveInformation('http://login@example.com/git/repo.git'),
        'http://example.com/git/repo.git'
      )
    })

    it('removes credentials and passwords when found', () => {
      assert.strictEqual(
        cleanSensitiveInformation(
          'ssh://login:password@example.com/git/repo.git'
        ),
        'ssh://example.com/git/repo.git'
      )
    })
  })
})
