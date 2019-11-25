import { readFile } from 'fs'
import { messages, ProtobufMessageStream } from 'cucumber-messages'
import React from 'react'
import program from 'commander'
import p from '../package.json'
import { Transform } from 'stream'
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
    callback: (error?: Error | null, data?: any) => void
  ): void {
    this.envelopes.push(envelope)
    callback()
  }

  public _flush(callback: (error?: Error | null, data?: any) => void): void {
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

const protobufMessageStream = new ProtobufMessageStream(
  messages.Envelope.decodeDelimited.bind(messages.Envelope)
)
protobufMessageStream.on('error', (err: Error) => exit(err))

const cucumberHtmlStream = new CucumberHtmlStream()
cucumberHtmlStream.on('error', (err: Error) => exit(err))

process.stdin
  .pipe(protobufMessageStream)
  .pipe(cucumberHtmlStream)
  .pipe(process.stdout)

function exit(err: Error) {
  console.error(err)
  process.exit(1)
}
