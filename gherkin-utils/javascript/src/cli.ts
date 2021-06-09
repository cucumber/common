import { Command } from 'commander'
import { version } from '../package.json'
import formatCommand from './commands/formatCommand'

const program = new Command()
program.version(version)

program
  .command('format <source> <destination>')
  .description('format <source> and write it to <destination>', {
    source: 'a file path or a quoted glob, for example features/hello.feature or "features/**/*.feature"',
    destination: 'a file path or a quoted glob, for example features/hello.feature.md or "features/**/*.feature.md"'
  })
  .action(formatCommand)

program.parse(process.argv)
