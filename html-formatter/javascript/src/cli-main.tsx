import { readFile } from 'fs'
import { messages, ProtobufMessageStream } from 'cucumber-messages'
import React from 'react'
import { Transform } from 'stream'
import { App, makeGherkinDocumentsAndResultsLookup } from 'cucumber-react'
import { renderToString } from 'react-dom/server'

class CucumberHtmlStream extends Transform {
  private readonly envelopes: messages.IEnvelope[] = []

  constructor() {
    super({ objectMode: true })
  }

  _transform(envelope: messages.IEnvelope, encoding: string, callback: (error?: (Error | null), data?: any) => void): void {
    this.envelopes.push(envelope)
    callback()
  }

  _flush(callback: (error?: (Error | null), data?: any) => void): void {
    readFile(__dirname + '/../main.js', (err: Error, js: Buffer) => {
      if (err) return callback(err)
      const { gherkinDocuments, resultsLookup, stepMatchLookup } = makeGherkinDocumentsAndResultsLookup(this.envelopes)
      this.push(`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Cucumber</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  </head>
  <body>
    <div id="content">
`)
      this.push(renderToString(<App gherkinDocuments={gherkinDocuments} resultsLookup={resultsLookup}
                                    stepMatchLookup={stepMatchLookup}/>))
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

const protobufMessageStream = new ProtobufMessageStream(messages.Envelope.decodeDelimited.bind(messages.Envelope))
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
