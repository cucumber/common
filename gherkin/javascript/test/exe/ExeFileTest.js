const assert = require('assert')
const ExeFile = require('../../lib/exe/ExeFile')

describe('ExeFile', () => {
  it("detects macos", () => {
    const exeFile = new ExeFile(
      'gherkin-{{.OS}}-{{.Arch}}{{.Ext}}',
      {os: 'darwin', arch: 'x64'}
    )

    assert.strictEqual(exeFile.fileName, 'gherkin-darwin-amd64')
  })
})