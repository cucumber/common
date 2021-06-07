import * as messages from '@cucumber/messages'
import { AstBuilder, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin'
import pretty from '../pretty'
import { readFile, writeFile } from 'fs/promises'
import path from "path";

export default async (sourcePath: string, sourceDestination: string | undefined) => {
  const tokenMatcher = new GherkinClassicTokenMatcher()
  const newId = messages.IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId), tokenMatcher)

  const gherkin = await readFile(sourcePath, 'utf-8')
  const gherkinDocument = parser.parse(gherkin)
  gherkinDocument.uri = sourcePath

  const syntax = path.extname(sourceDestination) === '.feature' ? 'gherkin' : 'markdown'
  const markdown = pretty(gherkinDocument, syntax)
  await writeFile(sourceDestination, markdown, 'utf-8')
}
