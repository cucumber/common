import assert from 'assert'
import { messages } from '@cucumber/messages'
import ciCommitLink from '../src/ciCommitLink'

describe('ciCommitLink(ci)', () => {
  context('when executed on GitHubAction', () => {
    it('returns a link to the commit view on GitHub', () => {
      const ci = messages.Meta.CI.create({
        name: 'GitHub Actions',
        url: 'http://anywhere',
        git: messages.Meta.CI.Git.create({
          remote: 'git@github.example.com:company/repo.git',
          revision: 'some-sha',
        }),
      })

      assert.strictEqual(
        ciCommitLink(ci),
        'https://github.example.com/company/repo/commit/some-sha'
      )
    })
  })

  context('when remote startss with github.com', () => {
    it('returns a link to the commit view on GitHub', () => {
      const ci = messages.Meta.CI.create({
        name: 'CircleCI',
        url: 'http://anywhere',
        git: messages.Meta.CI.Git.create({
          remote: 'https://github.com/company/repo.git',
          revision: 'some-sha',
        }),
      })

      assert.strictEqual(
        ciCommitLink(ci),
        'https://github.com/company/repo/commit/some-sha'
      )
    })
  })

  context('when git is not specified', () => {
    it('returns undefined', () => {
      const ci = messages.Meta.CI.create()

      assert.strictEqual(ciCommitLink(ci), null)
    })
  })
})
