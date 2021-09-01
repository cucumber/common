import { Command, Option } from 'commander'
import { version } from '../package.json'
import { formatCommand, FormatOptions } from './commands/formatCommand'

const program = new Command()
program.version(version)

program
  .command('fmt')
  .arguments('<files...>')
  .option('-l, --language <ISO 639-1>', 'specify the language (dialect) of the source')
  .addOption(new Option('-f, --from-syntax <syntax>', 'from syntax').choices(['gherkin', 'markdown']))
  .addOption(new Option('-t, --to-syntax <syntax>', 'to syntax').choices(['gherkin', 'markdown'])
  )
  .description(
    `Formats one or more files. STDIN is formatted and written to STDOUT (--from-syntax and --to-syntax must be specified)`,
    {
      files:
        'One or more .feature or .feature.md files',
    }
  )
  .action(async (files: string[], options: FormatOptions) => {
    await formatCommand(files, process.stdin.isTTY ? null : process.stdin, process.stdout, options)
  })

program.parse(process.argv)
