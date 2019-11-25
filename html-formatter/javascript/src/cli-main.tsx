import { readFile } from 'fs'
import {
  BinaryToMessageStream,
  messages,
  NdjsonToMessageStream,
} from 'cucumber-messages'
import React from 'react'
import program from 'commander'
import p from '../package.json'
import { pipeline, Transform, TransformCallback } from 'stream'
import { GherkinDocumentList } from 'cucumber-react'
import { renderToString } from 'react-dom/server'
import CucumberQuery from 'cucumber-query'

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
    readFile(__dirname + '/../main.js', (err: Error, js: Buffer) => {
      if (err) {
        return callback(err)
      }

      const gherkinDocuments = this.envelopes
        .filter(e => e.gherkinDocument)
        .map(e => e.gherkinDocument)
      const cucumberQuery = this.envelopes.reduce(
        (q, e) => q.update(e),
        new CucumberQuery()
      )

      this.push(`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Cucumber</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  </head>
  <body>
    <div id="content">
`)
      this.push(
        renderToString(
          <GherkinDocumentList
            gherkinDocuments={gherkinDocuments}
            cucumberQuery={cucumberQuery}
          />
        )
      )
      this.push(`
    </div>
    <script>
      window.CUCUMBER_MESSAGES = ${JSON.stringify(this.envelopes)}
    </script>
    <script>
${js.toString('utf8')}
    </script>
  </body>
</html>
`)
      callback()
    })
  }
}

program.version(p.version).parse(process.argv)
program.option(
  '-f, --format <format>',
  'output format: ndjson|protobuf',
  'protobuf'
)

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
