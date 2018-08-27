/* eslint-env mocha */
const assert = require('assert')
const ExeFile = require('../src/ExeFile')

describe('ExeFile', () => {
  it('detects macos', () => {
    const exeFile = new ExeFile('gherkin-{{.OS}}-{{.Arch}}{{.Ext}}', {
      os: 'darwin',
      arch: 'x64',
    })

    assert.strictEqual(exeFile.fileName, 'gherkin-darwin-amd64')
  })

  it('detects windows', () => {
    const exeFile = new ExeFile('gherkin-{{.OS}}-{{.Arch}}{{.Ext}}', {
      os: 'win32',
      arch: 'x32',
    })

    assert.strictEqual(exeFile.fileName, 'gherkin-windows-386.exe')
  })
})
