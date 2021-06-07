import { Command } from 'commander'
import { version } from '../package.json'
import formatCommand from './commands/formatCommand'

const program = new Command()
program.version(version)

program
  .command('format <source> [destination]')
  .description('format .feature and .feature.md files')
  .action(formatCommand)

program.parse(process.argv)
