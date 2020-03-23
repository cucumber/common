import { Command } from 'commander'
import packageJson from '../package.json'
import RubyJSONParser from './RubyJSONParser'
import { runCucumber } from 'fake-cucumber'

const program = new Command()
program.version(packageJson.version)
program.parse(process.argv)

const lines: string[] = []
process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  let chunk
  while ((chunk = process.stdin.read()) !== null) {
    lines.push(chunk)
  }
})

process.stdin.on('end', () => {
  const sources = JSON.parse(lines.join(''))
  const gherkinDocuments = new RubyJSONParser().parse(sources)

  runCucumber(null, gherkinDocuments, null, null)
})
