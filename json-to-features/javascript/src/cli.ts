import { Command } from 'commander'
import packageJson from '../package.json'

const program = new Command()
program.version(packageJson.version)
program.option('-o, --output <path>', 'Output directory')
program.parse(process.argv)

console.log('Coucou')
