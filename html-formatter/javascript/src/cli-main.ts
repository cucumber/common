import { NdjsonToMessageStream } from '@cucumber/message-streams'
import program from 'commander'
import p from '../package.json'
import { pipeline } from 'stream'
import CucumberHtmlStream from './CucumberHtmlStream'

program.version(p.version)
program.parse(process.argv)

const toMessageStream = new NdjsonToMessageStream()
pipeline(
  process.stdin,
  toMessageStream,
  new CucumberHtmlStream(__dirname + '/../../dist/main.css', __dirname + '/../../dist/main.js'),
  process.stdout,
  (err: any) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.error(err)
      process.exit(1)
    }
  }
)
