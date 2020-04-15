import { Command } from 'commander'
import packageJson from '../package.json'
import jsonToMessages from './jsonToMessages'
import detectPlatforms from './detectPlatforms'

const program = new Command()
program.version(packageJson.version)
program.option(
  '-p, --platform <platform>',
  'Platform used to generate the report: ruby|javascript|behave',
  ''
)
program.option('-d, --detect', 'Output detected language from JSON report', '')

program.parse(process.argv)
const { lang, detect } = program

if (detect) {
  detectPlatforms(process.stdin)
    .then(platforms => {
      process.stdout.write(`Detected platforms:
${platforms}
`)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
} else {
  jsonToMessages(process.stdin, process.stdout, lang).catch(err => {
    console.error(err)
    process.exit(1)
  })
}
