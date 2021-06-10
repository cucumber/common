import * as messages from '@cucumber/messages'
import {
  AstBuilder,
  GherkinClassicTokenMatcher,
  GherkinInMarkdownTokenMatcher,
  Parser,
} from '@cucumber/gherkin'
import pretty, { Syntax } from '../pretty'
import { readFile as readFileCb, writeFile as writeFileCb } from 'fs'
import {promisify} from 'util'
import path from 'path'
import fg from 'fast-glob'
import isGlob from 'is-glob'
import micromatch from 'micromatch'

const readFile = promisify(readFileCb)
const writeFile = promisify(writeFileCb)

export default async (from: string, to: string = from) => {
  const fromPaths = await fg(from)
  for (const fromPath of fromPaths) {
    const toPath = makeToPath(fromPath, from, to)
    await format(fromPath, toPath)
  }
}

export function makeToPath(fromPath: string, from: string, to: string): string {
  if (!isGlob(to)) {
    return to
  }
  const fromMatches = micromatch.capture(from, fromPath)
  return to.replace(/\*\*?/g, () => fromMatches.shift())
}

async function format(fromPath: string, toPath: string) {
  const sourceSyntax: Syntax = path.extname(fromPath) === '.feature' ? 'gherkin' : 'markdown'
  const destinationSyntax: Syntax = path.extname(toPath) === '.feature' ? 'gherkin' : 'markdown'

  const parser = new Parser(
    new AstBuilder(messages.IdGenerator.uuid()),
    sourceSyntax === 'gherkin'
      ? new GherkinClassicTokenMatcher()
      : new GherkinInMarkdownTokenMatcher()
  )

  const fromSource = await readFile(fromPath, 'utf-8')
  const gherkinDocument = parser.parse(fromSource)
  gherkinDocument.uri = fromPath

  const toSource = pretty(gherkinDocument, destinationSyntax)
  await writeFile(toPath, toSource, 'utf-8')
}
