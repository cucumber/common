import * as messages from '@cucumber/messages'
import { AstBuilder, GherkinClassicTokenMatcher, GherkinInMarkdownTokenMatcher, Parser } from '@cucumber/gherkin'
import pretty from '../pretty'
import { readFile, writeFile } from 'fs/promises'
import path from "path";

export default async (sourcePath: string, destinationPath: string | undefined) => {
  const sourceSyntax = path.extname(sourcePath) === '.feature' ? 'gherkin' : 'markdown'
  const destinationSyntax = path.extname(destinationPath) === '.feature' ? 'gherkin' : 'markdown'

  const tokenMatcher = sourceSyntax === 'gherkin' ? new GherkinClassicTokenMatcher() : new GherkinInMarkdownTokenMatcher()
  const newId = messages.IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId), tokenMatcher)

  const gherkin = await readFile(sourcePath, 'utf-8')
  const gherkinDocument = parser.parse(gherkin)
  gherkinDocument.uri = sourcePath

  const markdown = pretty(gherkinDocument, destinationSyntax)
  await writeFile(destinationPath, markdown, 'utf-8')
}
