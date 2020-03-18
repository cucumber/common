import { Command } from 'commander'
import packageJson from '../package.json'

const program = new Command()
program.version(packageJson.version)
program.parse(process.argv)

console.log('Coucou')
