import { Command, Option } from 'commander'
import { version } from '../package.json'
import formatCommand from './commands/formatCommand'

const program = new Command()
program.version(version)

program
  .command('format')
  .arguments('[source] [destination]')
  .option(
    '-m, --move',
    'delete the source file (ignored if the destination is the same as the source)'
  )
  .option('-l, --language <ISO 639-1>', 'specify the language (dialect) of the source')
  .addOption(new Option('-s, --syntax <syntax>', 'source syntax').choices(['gherkin', 'markdown']))
  .addOption(
    new Option('-d, --destination-syntax <syntax>', 'destination syntax').choices([
      'gherkin',
      'markdown',
    ])
  )
  .description(
    `Formats one or more [source] files and writes them to [destination].
If [destination] is not specified, the source files are modified in-place.
If no [source] is specified, reads from STDIN and writes to STDOUT.`,
    {
      source:
        'A file path or a QUOTED glob, for example features/hello.feature or "features/**/*.feature"',
      destination:
        'A file path or a QUOTED glob, for example features/hello.feature.md or "features/**/*.feature.md"',
    }
  )
  .action(formatCommand)

program.parse(process.argv)
