/* eslint-env mocha */
const assert = require('assert')
const cm = require('cucumber-messages').io.cucumber.messages
const Gherkin = require('../src/Gherkin')

describe('Gherkin', () => {
  it('parses gherkin from the file system', async () => {
    const messages = await streamToArray(
      Gherkin.fromPaths(['testdata/good/minimal.feature'])
    )
    assert.strictEqual(messages.length, 3)
  })

  it('parses gherkin from STDIN', async () => {
    const source = cm.Source.fromObject({
      uri: 'test.feature',
      data: `Feature: Minimal

  Scenario: minimalistic
    Given the minimalism
`,
      media: cm.Media.fromObject({
        encoding: 'UTF-8',
        contentType: 'text/x.cucumber.gherkin+plain',
      }),
    })

    const messages = await streamToArray(Gherkin.fromSources([source]))
    console.log('Messages', messages)
    assert.strictEqual(messages.length, 3)
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
