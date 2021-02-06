import { Command } from 'commander'
import packageJson from '../package.json'
import jsonToMessages from './jsonToMessages'
import detectImplementations from './detectImplementations'

const program = new Command()
program.version(packageJson.version)
program.option(
  '-i, --implementation <implementation>',
  'Cucumber implementation used to generate the report: cucumber-ruby|cucumber-js|behave',
  ''
)
program.option('-d, --detect', 'Output detected language from JSON report', '')

program.parse(process.argv)
const { lang, detect } = program.opts()

if (detect) {
  detectImplementations(process.stdin)
    .then((implementations) => {
      process.stdout.write(`Detected implementations:
${implementations}
`)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
} else {
  jsonToMessages(process.stdin, process.stdout, lang).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
