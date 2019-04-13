/* eslint-env mocha */
const assert = require('assert')
const { messages } = require('cucumber-messages')
const { dialects, fromPaths, fromSources } = require('../src/index')

describe('gherkin (JavaScript)', () => {
  it('parses gherkin from the file system', async () => {
    const messages = await streamToArray(
      fromPaths(['testdata/good/minimal.feature'])
    )
    assert.strictEqual(messages.length, 3)
  })

  it('parses gherkin from STDIN', async () => {
    const source = messages.Source.fromObject({
      uri: 'test.feature',
      data: `Feature: Minimal

  Scenario: minimalistic
    Given the minimalism
`,
      media: messages.Media.fromObject({
        encoding: 'UTF-8',
        contentType: 'text/x.cucumber.gherkin+plain',
      }),
    })

    const wrappers = await streamToArray(fromSources([source]))
    assert.strictEqual(wrappers.length, 3)
  })

  it('parses outputs dialects', async () => {
    const result = dialects()
    assert.strictEqual(result['en'].name, 'English')
  })
})

function streamToArray(readableStream) {
  return new Promise((resolve, reject) => {
    const items = []
    readableStream.on('data', items.push.bind(items))
    readableStream.on('error', reject)
    readableStream.on('end', () => resolve(items))
  })
}
