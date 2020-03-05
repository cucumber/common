import { readFile } from 'fs'
import {
  BinaryToMessageStream,
  messages,
  NdjsonToMessageStream,
} from '@cucumber/messages'
import program from 'commander'
import p from '../package.json'
import { pipeline, Transform, TransformCallback } from 'stream'

class CucumberHtmlStream extends Transform {
  private readonly envelopes: messages.IEnvelope[] = []

  constructor() {
    super({ objectMode: true })
  }

  public _transform(
    envelope: messages.IEnvelope,
    encoding: string,
    callback: TransformCallback
  ): void {
    this.envelopes.push(envelope)
    callback()
  }

  public _flush(callback: TransformCallback): void {
    readFile(
      __dirname + '/../main.js',
      { encoding: 'utf-8' },
      (err: Error, js: string) => {
        if (err) return callback(err)

        readFile(
          __dirname +
            '/../../node_modules/@cucumber/react/dist/src/styles/cucumber-react.css',
          { encoding: 'utf-8' },
          (err: Error, css: string) => {
            if (err) return callback(err)

            this.push(`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Cucumber</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <style>
${css}
    </style>
  </head>
  <body>
    <div id="content">
    </div>
    <script>
      window.CUCUMBER_MESSAGES = ${JSON.stringify(this.envelopes)}
    </script>
    <script>
${js}
    </script>
  </body>
</html>
`)
            callback()
          }
        )
      }
    )
  }
}

program.version(p.version)
program.option(
  '-f, --format <format>',
  'output format: ndjson|protobuf',
  'protobuf'
)
program.parse(process.argv)

const toMessageStream =
  program.format === 'ndjson'
    ? new NdjsonToMessageStream(
        messages.Envelope.fromObject.bind(messages.Envelope)
      )
    : new BinaryToMessageStream(
        messages.Envelope.decodeDelimited.bind(messages.Envelope)
      )

pipeline(
  process.stdin,
  toMessageStream,
  new CucumberHtmlStream(),
  process.stdout,
  (err: any) => {
    // tslint:disable-next-line:no-console
    console.error(err)
    process.exit(1)
  }
)
