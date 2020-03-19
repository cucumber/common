import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import packageJson from '../package.json'
import JSONToFeature from './JSONToFeature'

const program = new Command()
program.version(packageJson.version)
program.option('-o, --output <path>', 'Output directory')
program.parse(process.argv)
const { output } = program

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
  const gherkinDocuments = new JSONToFeature().makeFeatures(sources)

  for (const document of gherkinDocuments) {
    const fileExport = document.toFile()
    const fullPath = `${output}/${fileExport.path}`

    console.log('Writing file:', fullPath)
    fs.mkdirSync(path.dirname(fullPath))
    fs.writeFileSync(fullPath, fileExport.content)
  }
})
