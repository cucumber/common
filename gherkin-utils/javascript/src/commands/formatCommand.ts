import * as messages from '@cucumber/messages'
import {AstBuilder, GherkinClassicTokenMatcher, GherkinInMarkdownTokenMatcher, Parser,} from '@cucumber/gherkin'
import pretty from '../pretty'
import {readFile, writeFile} from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'
import isGlob from 'is-glob'
import micromatch from 'micromatch'


export default async (from: string, to: string) => {
  for (const fromPath of await fg(from)) {
    const toPath = makeToPath(fromPath, from, to)
    await format(fromPath, toPath)
  }
}

export function makeToPath(fromPath: string, fromGlob: string, toGlob: string): string {
  if (!isGlob(toGlob)) {
    return toGlob
  }
  const fromMatches = micromatch.capture(fromGlob, fromPath)
  return toGlob.replace(/\*\*?/g, () => fromMatches.shift())
}

async function format(fromPath: string, toPath: string) {
  const sourceSyntax = path.extname(fromPath) === '.feature' ? 'gherkin' : 'markdown'
  const destinationSyntax = path.extname(toPath) === '.feature' ? 'gherkin' : 'markdown'

  const tokenMatcher =
    sourceSyntax === 'gherkin'
      ? new GherkinClassicTokenMatcher()
      : new GherkinInMarkdownTokenMatcher()
  const newId = messages.IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId), tokenMatcher)

  const fromSource = await readFile(fromPath, 'utf-8')
  const gherkinDocument = parser.parse(fromSource)
  gherkinDocument.uri = fromPath

  const toSource = pretty(gherkinDocument, destinationSyntax)
  await writeFile(toPath, toSource, 'utf-8')
}
