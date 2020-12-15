import assert from 'assert'
import toRepositoryId from '../src/toRepositoryId'

const testData = [
  ['github.com/owner/name', 'https://github.com/owner/name'],
  ['github.com/owner/name', 'git+ssh://git@github.com/owner/name.git'],
  ['github.com/owner/name', 'git@github.com:owner/name.git'],
]

describe('#parseGitUrl', () => {
  for (const [expected, url] of testData) {
    it(`parses ${url} to ${expected}`, () => {
      const repositoryId = toRepositoryId(url)
      assert.strictEqual(repositoryId, expected)
    })
  }
})
