import createMeta from '../src/createMeta'
import assert from 'assert'
import ciDict from '../src/ciDict.json'
import * as messages from '@cucumber/messages'

describe('createMeta', () => {
  it('defines the implementation product', () => {
    const meta = createMeta('someTool', '1.2.3', {}, {})

    assert.strictEqual(meta.implementation.name, 'someTool')
    assert.strictEqual(meta.implementation.version, '1.2.3')
  })

  it('detects CircleCI', () => {
    const envDict = {
      CIRCLE_BUILD_URL: 'the-url',
      CIRCLE_REPOSITORY_URL: 'the-remote',
      CIRCLE_BRANCH: 'the-branch',
      CIRCLE_SHA1: 'the-revision',
      CIRCLE_TAG: 'the-tag',
      CIRCLE_BUILD_NUM: '234',
    }

    const meta = createMeta('someTool', '1.2.3', envDict, ciDict)
    const ci: messages.Ci = {
      name: 'CircleCI',
      url: 'the-url',
      buildNumber: '234',
      git: {
        remote: 'the-remote',
        branch: 'the-branch',
        revision: 'the-revision',
        tag: 'the-tag',
      },
    }
    assert.deepStrictEqual(meta.ci, ci)
  })

  it('detects GitHub Actions', () => {
    const envDict = {
      GITHUB_SERVER_URL: 'https://github.com',
      GITHUB_REPOSITORY: 'cucumber/cucumber-ruby',
      GITHUB_RUN_ID: '140170388',
      GITHUB_SHA: 'the-revision',
      GITHUB_REF: 'refs/tags/the-tag',
    }

    const meta = createMeta('someTool', '1.2.3', envDict, ciDict)
    const ci: messages.Ci = {
      name: 'GitHub Actions',
      url: 'https://github.com/cucumber/cucumber-ruby/actions/runs/140170388',
      buildNumber: '140170388',
      git: {
        remote: 'https://github.com/cucumber/cucumber-ruby.git',
        branch: undefined,
        revision: 'the-revision',
        tag: 'the-tag',
      },
    }
    assert.deepStrictEqual(meta.ci, ci)
  })

  it('detects GitHub Actions with custom base url', () => {
    const envDict = {
      GITHUB_SERVER_URL: 'https://github.company.com',
      GITHUB_REPOSITORY: 'cucumber/cucumber-ruby',
      GITHUB_RUN_ID: '140170388',
      GITHUB_SHA: 'the-revision',
      GITHUB_REF: 'refs/heads/the-branch',
    }

    const meta = createMeta('someTool', '1.2.3', envDict, ciDict)
    const ci: messages.Ci = {
      name: 'GitHub Actions',
      url: 'https://github.company.com/cucumber/cucumber-ruby/actions/runs/140170388',
      buildNumber: '140170388',
      git: {
        remote: 'https://github.company.com/cucumber/cucumber-ruby.git',
        branch: 'the-branch',
        revision: 'the-revision',
        tag: undefined,
      },
    }
    assert.deepStrictEqual(meta.ci, ci)
  })

  it('post-processes git refs to branch', () => {
    const envDict = {
      BUILD_BUILDURI: 'the-url',
      BUILD_REPOSITORY_URI: 'the-remote',
      BUILD_SOURCEBRANCH: 'refs/heads/main',
      BUILD_SOURCEVERSION: 'the-revision',
      BUILD_BUILDNUMBER: '456',
    }

    const meta = createMeta('someTool', '1.2.3', envDict, ciDict)
    const ci: messages.Ci = {
      name: 'Azure Pipelines',
      url: 'the-url',
      buildNumber: '456',
      git: {
        remote: 'the-remote',
        branch: 'main',
        revision: 'the-revision',
        tag: undefined,
      },
    }
    assert.deepStrictEqual(meta.ci, ci)
  })

  it('post-processes git refs to tag', () => {
    const envDict = {
      BUILD_BUILDURI: 'the-url',
      BUILD_REPOSITORY_URI: 'the-remote',
      BUILD_SOURCEBRANCH: 'refs/tags/v1.2.3',
      BUILD_SOURCEVERSION: 'the-revision',
      BUILD_BUILDNUMBER: '456',
    }

    const meta = createMeta('someTool', '1.2.3', envDict, ciDict)
    const ci: messages.Ci = {
      name: 'Azure Pipelines',
      url: 'the-url',
      buildNumber: '456',
      git: {
        remote: 'the-remote',
        branch: undefined,
        revision: 'the-revision',
        tag: 'v1.2.3',
      },
    }
    assert.deepStrictEqual(meta.ci, ci)
  })

  it('extracts build number from url', () => {
    const envDict = {
      WERCKER_GIT_BRANCH: 'main',
      WERCKER_GIT_COMMIT: '057f8fe233b17629af084064c2a7b8d1dbb795ad',
      WERCKER_GIT_DOMAIN: 'github.com',
      WERCKER_GIT_OWNER: 'cucumber-ltd',
      WERCKER_GIT_REPOSITORY: 'shouty.rb',
      WERCKER_RUN_URL: 'https://cihost.com/path/to/build/629af084064c2',
    }

    const meta = createMeta('someTool', '1.2.3', envDict, ciDict)
    const ci: messages.Ci = {
      git: {
        branch: 'main',
        tag: undefined,
        remote: 'https://github.com/cucumber-ltd/shouty.rb.git',
        revision: '057f8fe233b17629af084064c2a7b8d1dbb795ad',
      },
      name: 'Wercker',
      url: 'https://cihost.com/path/to/build/629af084064c2',
      buildNumber: '629af084064c2',
    }
    assert.deepStrictEqual(meta.ci, ci)
  })
})
