const assert = require('assert')
const cm = require('cucumber-messages').io.cucumber.messages
const Gherkin = require('../lib/Gherkin')

describe('Gherkin', () => {
  it("parses gherkin from the file system", async () => {
    const gherkin = new Gherkin(
      ["testdata/good/minimal.feature"],
      [],
      {}
    )
    const messages = await streamToArray(gherkin.messages())
    assert.strictEqual(messages.length, 3)
  })

  it("parses gherkin from STDIN", async () => {
    const source = cm.Source.fromObject({
      uri: 'test.feature',
      data: `Feature: Minimal

  Scenario: minimalistic
    Given the minimalism
`,
      media: cm.Media.fromObject({
        encoding:    "UTF-8",
        contentType: "text/x.cucumber.gherkin+plain",
      })
    })

    const gherkin = new Gherkin(
      [],
      [source],
      {}
    )
    const messages = await streamToArray(gherkin.messages())
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