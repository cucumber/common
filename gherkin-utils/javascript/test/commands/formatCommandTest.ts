import formatCommand from '../../src/commands/formatCommand'
import assert from 'assert'
import * as fs from 'fs'
import * as os from 'os'

describe('formatCommand', () => {
  let tmpdir: string
  beforeEach(async () => {
    tmpdir = fs.mkdtempSync(os.tmpdir())
  })

  it('formats single Gherkin file to Markdown file', async () => {
    const sourcePath = `${tmpdir}/source.feature`
    await fs.writeFileSync(sourcePath, 'Feature: Hello\n', 'utf-8')

    const destinationPath = `${tmpdir}/source.feature.md`

    await formatCommand(sourcePath, destinationPath)
    const markdown = fs.readFileSync(destinationPath, 'utf-8')
    assert.deepStrictEqual(markdown, '# Feature: Hello\n')
  })
})
