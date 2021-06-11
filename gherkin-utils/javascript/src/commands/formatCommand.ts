import * as messages from '@cucumber/messages'
import {AstBuilder, GherkinClassicTokenMatcher, GherkinInMarkdownTokenMatcher, Parser,} from '@cucumber/gherkin'
import pretty, {Syntax} from '../pretty'
import fs, {unlink as unlinkCb} from 'fs'
import {promisify} from 'util'
import path from 'path'
import {Readable, Writable} from 'stream'
import glob from 'fast-glob'
import isGlob from 'is-glob'
import micromatch from 'micromatch'

const unlink = promisify(unlinkCb)

type Options = {
  move: boolean
  language: string
}

type Conversion = {
  readable: () => Readable,
  readableSyntax: Syntax
  readableLanguage: string
  writable: () => Writable,
  writableSyntax: Syntax
  afterWrite: () => Promise<void>
}

export default async (from: string | undefined, to: string | undefined, options: Partial<Options> = {}) => {
  if (!to) {
    to = from
  }
  const fromPaths = await glob(from)
  const conversions = fileConversions(fromPaths, from, to, options);
  for (const conversion of conversions) {
    await convert(conversion)
  }
}

function fileConversions(fromPaths: readonly string[], from: string, to: string, options: Partial<Options>): readonly Conversion[] {
  return fromPaths.map(fromPath => {
    const readable = () => fs.createReadStream(fromPath)
    const readableSyntax = getSyntax(fromPath);
    const toPath = makeToPath(fromPath, from, to)
    const writable = () => fs.createWriteStream(toPath, 'utf8')
    const writableSyntax = getSyntax(toPath)
    const afterWrite = (options.move && toPath !== fromPath) ? () => unlink(fromPath) : () => Promise.resolve()
    return {
      readable,
      readableSyntax,
      readableLanguage: options.language,
      writable,
      writableSyntax,
      afterWrite
    }
  })
}

async function read(readable: Readable): Promise<string> {
  const chunks = []
  for await (const chunk of readable) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf-8')
}

export function makeToPath(fromPath: string, from: string, to: string): string {
  if (!isGlob(to)) {
    return to
  }
  const fromMatches = micromatch.capture(from, fromPath)
  return to.replace(/\*\*?/g, () => fromMatches.shift())
}

function getSyntax(fromPath: string) {
  return path.extname(fromPath) === '.feature' ? 'gherkin' : 'markdown';
}

function parse(source: string, syntax: Syntax, language: string) {
  const fromParser = new Parser(
    new AstBuilder(messages.IdGenerator.uuid()),
    syntax === 'gherkin'
      ? new GherkinClassicTokenMatcher(language)
      : new GherkinInMarkdownTokenMatcher(language)
  )
  return fromParser.parse(source);
}

async function convert(conversion: Conversion) {
  const source = await read(conversion.readable())
  const gherkinDocument = parse(source, conversion.readableSyntax, conversion.readableLanguage)
  const output = pretty(gherkinDocument, conversion.writableSyntax)

  try {
    // Sanity check that what we generated is OK.
    parse(output, conversion.writableSyntax, gherkinDocument.feature?.language)
  } catch (err) {
    console.error(`The generated output is not parseable. This is a bug.`)
    console.error(`Please report a bug at https://github.com/cucumber/common/issues/new`)
    console.error(err.stack)
    console.error(`--- Generated ${conversion.writableSyntax} source ---`)
    console.error(output)
    console.error(`------`)
    process.exit(2)
  }
  const writable = conversion.writable()
  writable.write(output)
  writable.end()
  await new Promise((resolve) => writable.once('finish', resolve))
  await conversion.afterWrite()
}
