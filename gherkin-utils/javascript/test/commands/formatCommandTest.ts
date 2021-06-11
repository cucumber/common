import formatCommand, { makeToPath } from '../../src/commands/formatCommand'
import assert from 'assert'
import {
  existsSync,
  readFile as readFileCb,
  writeFile as writeFileCb,
  mkdir as mkdirCb,
  mkdtemp as mkdtempCb,
} from 'fs'
import os from 'os'
import { promisify } from 'util'

const mkdtemp = promisify(mkdtempCb)
const mkdir = promisify(mkdirCb)
const writeFile = promisify(writeFileCb)
const readFile = promisify(readFileCb)

describe('formatCommand', () => {
  let tmpdir: string
  beforeEach(async () => {
    tmpdir = await mkdtemp(os.tmpdir() + '/')
  })

  afterEach(async () => {
    tmpdir = await mkdtemp(os.tmpdir() + '/')
  })

  it('formats an empty file', async () => {
    const fromPath = `${tmpdir}/source.feature`
    await writeFile(fromPath, '', 'utf-8')

    const toPath = `${tmpdir}/source.feature.md`

    await formatCommand(fromPath, toPath)
    const markdown = await readFile(toPath, 'utf-8')
    assert.deepStrictEqual(markdown, '')
  })

  it('formats single Gherkin file to Markdown file', async () => {
    const fromPath = `${tmpdir}/source.feature`
    await writeFile(fromPath, 'Feature: Hello\n', 'utf-8')

    const toPath = `${tmpdir}/source.feature.md`

    await formatCommand(fromPath, toPath)
    const markdown = await readFile(toPath, 'utf-8')
    assert.deepStrictEqual(markdown, '# Feature: Hello\n')
  })

  it('formats Gherkin files in-place', async () => {
    const fromPath = `${tmpdir}/1.feature`
    await writeFile(fromPath, '     Feature:     1\n', 'utf-8')

    await formatCommand(fromPath, undefined)

    const gherkin = await readFile(fromPath, 'utf-8')
    assert.deepStrictEqual(gherkin, 'Feature: 1\n')
  })

  it('formats several Gherkin files to several Markdown files', async () => {
    await mkdir(`${tmpdir}/x/1`, { recursive: true })
    await mkdir(`${tmpdir}/x/2`, { recursive: true })
    await writeFile(`${tmpdir}/x/1/1.feature`, 'Feature: 1\n', 'utf-8')
    await writeFile(`${tmpdir}/x/2/2.feature`, 'Feature: 2\n', 'utf-8')

    await formatCommand(`${tmpdir}/**/*.feature`, `${tmpdir}/**/*.feature.md`)

    const markdown1 = await readFile(`${tmpdir}/x/1/1.feature.md`, 'utf-8')
    assert.deepStrictEqual(markdown1, '# Feature: 1\n')
    const markdown2 = await readFile(`${tmpdir}/x/2/2.feature.md`, 'utf-8')
    assert.deepStrictEqual(markdown2, '# Feature: 2\n')
  })

  it('deletes the from file when move is specified', async () => {
    const from = `${tmpdir}/1.feature`
    const to = `${tmpdir}/1.feature.md`
    await writeFile(from, 'Feature: 1\n', 'utf-8')
    await formatCommand(from, to, { move: true })

    const markdown = await readFile(to, 'utf-8')
    assert.deepStrictEqual(markdown, '# Feature: 1\n')
    assert(!existsSync(from))
  })

  it('does not remove the from file when move is specified and to is the same as from', async () => {
    const from = `${tmpdir}/1.feature`
    await writeFile(from, '  Feature:   1\n', 'utf-8')
    await formatCommand(from, from, { move: true })

    const gherkin = await readFile(from, 'utf-8')
    assert.deepStrictEqual(gherkin, 'Feature: 1\n')
    assert(existsSync(from))
  })

  describe('makeToPath', () => {
    it('does it', () => {
      const fromGlob = `/a/b/**/*.feature`
      const toGlob = `/x/y/**/*.feature.md`

      const toPath = makeToPath(`/a/b/c/d/e.feature`, fromGlob, toGlob)
      assert.deepStrictEqual(toPath, `/x/y/c/d/e.feature.md`)
    })
  })
})
