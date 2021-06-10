import { Command } from 'commander'
import packageJson from '../../package.json'
import GherkinStreams from '../GherkinStreams'
import { IdGenerator } from '@cucumber/messages'
import { MessageToNdjsonStream } from '@cucumber/message-streams'
import { IGherkinOptions } from '@cucumber/gherkin'

const program = new Command()
program.version(packageJson.version)
program.option('--no-source', 'Do not output Source messages', false)
program.option('--no-ast', 'Do not output GherkinDocument messages', false)
program.option('--no-pickles', 'Do not output Pickle messages', false)
program.option('--predictable-ids', 'Use predictable ids', false)
program.parse(process.argv)
const paths = program.args

const options: IGherkinOptions = {
  defaultDialect: 'en',
  includeSource: program.opts().source,
  includeGherkinDocument: program.opts().ast,
  includePickles: program.opts().pickles,
  newId: program.opts().predictableIds ? IdGenerator.incrementing() : IdGenerator.uuid(),
}

GherkinStreams.fromPaths(paths, options).pipe(new MessageToNdjsonStream()).pipe(process.stdout)
