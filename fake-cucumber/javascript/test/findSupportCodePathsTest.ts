import assert from 'assert'
import findSupportCodePaths from '../src/findSupportCodePaths'

describe('#findSupportCodePaths', () => {
  it('finds files underneath feature directories', async () => {
    const paths = [
      __dirname + '/support/test.feature',
      __dirname + '/support/nested',
    ]
    const supportCodePaths = await findSupportCodePaths(paths)
    assert.deepStrictEqual(supportCodePaths, [
      __dirname + '/support/nested/js.js',
      __dirname + '/support/nested/ts.ts',
    ])
  })

  it("finds files underneath feature file's patrent directories using relative paths", async () => {
    const paths = ['test/support/test.feature']
    const supportCodePaths = await findSupportCodePaths(paths)
    assert.deepStrictEqual(supportCodePaths, [
      __dirname + '/support/nested/js.js',
      __dirname + '/support/nested/ts.ts',
    ])
  })

  it('finds a single file when specified directly', async () => {
    const paths = ['test/support/nested/js.js']
    const supportCodePaths = await findSupportCodePaths(paths)
    assert.deepStrictEqual(supportCodePaths, [
      __dirname + '/support/nested/js.js',
    ])
  })
})
