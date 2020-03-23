import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import packageJson from '../package.json'
import RubyJSONParser from './RubyJSONParser'

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

  for (const document of gherkinDocuments) {
    console.log(document)
  }
})
